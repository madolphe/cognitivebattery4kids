#@ TODO: create view for each task, possibly use a generic launcher 
# and consider each task with the manager_app

from survey_app.models import Answer, Question

import json 

from django.shortcuts import render, redirect, HttpResponse
from django.contrib.auth.decorators import login_required
from django.urls import reverse

from survey_app.models import Answer, Question
from manager_app.models import ParticipantProfile, Study, ExperimentSession
from mot_app.models import CognitiveTask, CognitiveResult
from manager_app.utils import is_admin_team, _get_user_study
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib import messages as django_messages
from django.core.paginator import Paginator


import random 
import copy 

# Let's define several views for each new task in the study:
@login_required
def mot_app_task4kids(request):
    current_task_name = "moteval"
    return launch_task(request,current_task_name, show_progress=False)

@login_required
def ufov_task4kids(request):
    current_task_name = "ufov"
    return launch_task(request,current_task_name, show_progress=False)  

@login_required
def workingmemory_task4kids(request):
    current_task_name = "workingmemory"
    return launch_task(request,current_task_name, show_progress=False) 

@login_required
def memorability1_task4kids(request):
    current_task_name = "memorability_1"
    return launch_task(request,current_task_name, show_progress=False) 

@login_required
def memorability2_task4kids(request):
    current_task_name = "memorability_2"
    return launch_task(request,current_task_name, show_progress=False) 

def launch_task(request, current_task_name, show_progress=True):
    '''
    This view is a simplification of mot_app launch task func.
    '''
    participant = ParticipantProfile.objects.get(user=request.user.id)
    participant.extra_json["current_task"] = current_task_name
    idx = participant.extra_json.get("current_idx_task", -1)
    participant.extra_json["current_idx_task"] = idx + 1
    participant.save()
    screen_params = Answer.objects.get(participant=participant, question__handle='prof-mot-1').value
    current_task_object = CognitiveTask.objects.values().get(name=current_task_name)
    # Override view name:
    current_task_object['view_name'] = "cognitive_task4kids"
    return render(request,
                  'pre-post-tasks4kids/instructions/pre-post4kids.html',
                  {'CONTEXT': {'participant': participant,
                               'current_task': current_task_object,
                               'screen_params': screen_params,
                               'show_progress': show_progress}})

@login_required
def cognitive_task4kids(request):
    """
        View used to render all activities in the pre/post assessment
        Render a base html file that uses a custom filter django tag to include the correct js scripts
    """
    participant = ParticipantProfile.objects.get(user=request.user.id)
    screen_params = Answer.objects.get(participant=participant, question__handle='prof-mot-1').value
    current_task = participant.extra_json["current_task"]
    exit_view = "exit_view_cognitive_task4kids"
    debug_mode = participant.extra_json.get('debug_mode', False)
    return render(request,
                  'pre-post-tasks4kids/base_pre_post_app4kids.html',
                  {"CONTEXT": {"screen_params": screen_params,
                               "task": current_task,
                               "exit_view": exit_view,
                               "debug_mode": debug_mode}})

@login_required
def exit_view_cognitive_task4kids(request):
    data = request.POST.dict()
    if 'csrfmiddlewaretoken' in data:
        del data['csrfmiddlewaretoken']
    participant = ParticipantProfile.objects.get(user=request.user.id) 
    task_name = participant.extra_json["current_task"] 
    task = CognitiveTask.objects.get(name=task_name)
    idx = participant.extra_json["current_idx_task"]
    store_cog_results(task, participant, idx, data)
    return redirect(reverse('end_task'))

def store_cog_results(task, participant, idx_task, data):
    res = CognitiveResult()
    res.cognitive_task = task
    res.participant = participant
    res.idx = idx_task
    res.results = data
    res.status = 'None'
    res.save()
    return res


@login_required
def general_tutorial4kids(request):
    user = request.user
    participant = user.participantprofile
    # If participant has a session assigned, set request.session.active_session to True
    if participant.current_session:
        request.session['active_session'] = json.dumps(True)
    parameter_dict = {}    
    # In the future, if we need the stack to be random, uncomment the following line:
    # shuffle_task_stack(participant)
    return render(request, 'introduction/general_tuto_4kids.html',
                  {"CONTEXT": {"participant": participant, "parameter_dict": parameter_dict}})

def shuffle_task_stack(participant):
    tasks = copy.deepcopy(participant.task_stack_csv.split(',')[2:])
    random.shuffle(tasks)
    list_task_stack_csv =  participant.task_stack_csv.split(',')[:2]+ tasks
    participant.task_stack_csv = ",".join(list_task_stack_csv)
    participant.save()


# Admin pannels:

@user_passes_test(lambda u: is_admin_team(u))
def admin_change_screen_size(request):
    study = _get_user_study(request.user)
    participants = ParticipantProfile.objects.filter(study=study)
    # Pagination
    paginator = Paginator(participants, 10)  # 15 participants per page
    page_number = request.GET.get("page", 1)
    page_obj = paginator.get_page(page_number)
    # Handle POST request to update screen size
    if request.method == "POST":
        participant_to_update = request.POST.get('participant_username')
        diag_size = request.POST.get('diag_size')
        # on conserve la page courante
        current_page = request.POST.get("page", page_obj.number)
        if not diag_size:
            django_messages.error(request, "Nouvelle taille d'écran non fournie.")
            return redirect(f"{request.path}?page={current_page}")
        try:
            numeric_size = float(diag_size)
            ans = Answer.objects.get(participant__user__username=participant_to_update,question__handle='prof-mot-1')
            ans.value = numeric_size
            ans.save()
        except Answer.DoesNotExist:
            django_messages.error(request, 'Participant ou réponse introuvable.')
            return redirect(f"{request.path}?page={current_page}")
        except (TypeError, ValueError):
            django_messages.error(
                request,
                "La valeur fournie n’est pas un nombre valide."
            )
            return redirect(f"{request.path}?page={current_page}")
        django_messages.success(request, f'Taille d\'écran mise à jour pour {participant_to_update}.')
    answers = Answer.objects.filter(question__handle='prof-mot-1', participant__in=participants)
    answers_map = {
        a.participant.user.username: a.value
        for a in answers
    }
    return render(request, "admin/admin_change_screen_size.html", {
        "participants": participants,
        "answers_map": answers_map,
        "page_obj": page_obj
    })