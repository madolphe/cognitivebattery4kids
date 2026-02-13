# @ TODO: create view for each task, possibly use a generic launcher
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
from django.utils import timezone
from django.views.decorators.cache import never_cache
from django.utils.dateparse import parse_datetime
from django.http import HttpResponseNotAllowed, StreamingHttpResponse, Http404
from django.db.models import OuterRef, Subquery
from django.db.models.functions import Cast
from django.db.models import CharField
from pathlib import Path
from django.conf import settings

import random
import copy
import csv
# Let's define several views for each new task in the study:


@never_cache
@login_required
def mot_app_task4kids(request):
    current_task_name = "moteval"
    return launch_task(request, current_task_name, show_progress=False)


@never_cache
@login_required
def ufov_task4kids(request):
    current_task_name = "ufov"
    return launch_task(request, current_task_name, show_progress=False)


@never_cache
@login_required
def workingmemory_task4kids(request):
    current_task_name = "workingmemory"
    return launch_task(request, current_task_name, show_progress=False)


@never_cache
@login_required
def memorability1_task4kids(request):
    current_task_name = "memorability_1"
    return launch_task(request, current_task_name, show_progress=False)


@never_cache
@login_required
def memorability2_task4kids(request):
    current_task_name = "memorability_2"
    return launch_task(request, current_task_name, show_progress=False)


def launch_task(request, current_task_name, show_progress=True):
    """
    This view is a simplification of mot_app launch task func.
    """
    participant = ParticipantProfile.objects.get(user=request.user.id)
    participant.extra_json["current_task"] = current_task_name
    idx = participant.extra_json.get("current_idx_task", -1)
    nb_tasks = 5  # Total number of tasks in the pre/post battery
    participant.extra_json["current_idx_task"] = nb_tasks - len(
        participant.task_stack_csv.split(",")
    )
    participant.extra_json["start_time_task"] = (
        timezone.now().astimezone(timezone.utc).isoformat()
    )
    participant.save()
    screen_params = Answer.objects.get(
        participant=participant, question__handle="prof-mot-1"
    ).value
    current_task_object = CognitiveTask.objects.values().get(name=current_task_name)
    # Override view name:
    current_task_object["view_name"] = "cognitive_task4kids"
    return render(
        request,
        "pre-post-tasks4kids/instructions/pre-post4kids.html",
        {
            "CONTEXT": {
                "participant": participant,
                "current_task": current_task_object,
                "screen_params": screen_params,
                "show_progress": show_progress,
            }
        },
    )


@never_cache
@login_required
def cognitive_task4kids(request):
    """
    View used to render all activities in the pre/post assessment
    Render a base html file that uses a custom filter django tag to include the correct js scripts
    """
    participant = ParticipantProfile.objects.get(user=request.user.id)
    screen_params = Answer.objects.get(
        participant=participant, question__handle="prof-mot-1"
    ).value
    current_task = participant.extra_json["current_task"]
    exit_view = "exit_view_cognitive_task4kids"
    debug_mode = participant.extra_json.get("debug_mode", False)
    return render(
        request,
        "pre-post-tasks4kids/base_pre_post_app4kids.html",
        {
            "CONTEXT": {
                "screen_params": screen_params,
                "task": current_task,
                "exit_view": exit_view,
                "debug_mode": debug_mode,
            }
        },
    )


@login_required
def exit_view_cognitive_task4kids(request):
    data = request.POST.dict()
    if "csrfmiddlewaretoken" in data:
        del data["csrfmiddlewaretoken"]
    participant = ParticipantProfile.objects.get(user=request.user.id)
    start = participant.extra_json.get("start_time_task", None)
    if start:
        start_dt = parse_datetime(start)
        end_dt = timezone.now().astimezone(timezone.utc)
        duration = (end_dt - start_dt).total_seconds() / 60.0  # duration in minutes
    else:
        duration = None
    p_durations = participant.extra_json.get("tasks_duration")
    if not isinstance(p_durations, list):
        p_durations = []
    p_durations.append(duration)
    participant.extra_json["tasks_duration"] = p_durations
    p_dates = participant.extra_json.get("dates_tasks")
    if not isinstance(p_dates, list):
        p_dates = []
    p_dates.append(timezone.now().astimezone(timezone.utc).isoformat())
    participant.extra_json["dates_tasks"] = p_dates
    participant.save()
    task_name = participant.extra_json["current_task"]
    task = CognitiveTask.objects.get(name=task_name)
    idx = participant.extra_json["current_idx_task"]
    store_cog_results(task, participant, idx, data)
    return redirect(reverse("end_task"))


def store_cog_results(task, participant, idx_task, data):
    res = CognitiveResult()
    res.cognitive_task = task
    res.participant = participant
    res.idx = idx_task
    res.results = data
    res.status = "None"
    res.save()
    return res


@login_required
def general_tutorial4kids(request):
    user = request.user
    participant = user.participantprofile
    # If participant has a session assigned, set request.session.active_session to True
    if participant.current_session:
        request.session["active_session"] = json.dumps(True)
    parameter_dict = {}
    # In the future, if we need the stack to be random, uncomment the following line:
    # shuffle_task_stack(participant)
    return render(
        request,
        "introduction/general_tuto_4kids.html",
        {"CONTEXT": {"participant": participant, "parameter_dict": parameter_dict}},
    )


def shuffle_task_stack(participant):
    tasks = copy.deepcopy(participant.task_stack_csv.split(",")[2:])
    random.shuffle(tasks)
    list_task_stack_csv = participant.task_stack_csv.split(",")[:2] + tasks
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
        participant_to_update = request.POST.get("participant_username")
        diag_size = request.POST.get("diag_size")
        # on conserve la page courante
        current_page = request.POST.get("page", page_obj.number)
        if not diag_size:
            django_messages.error(request, "Nouvelle taille d'écran non fournie.")
            return redirect(f"{request.path}?page={current_page}")
        try:
            numeric_size = float(diag_size)
            ans = Answer.objects.get(
                participant__user__username=participant_to_update,
                question__handle="prof-mot-1",
            )
            ans.value = numeric_size
            ans.save()
        except Answer.DoesNotExist:
            django_messages.error(request, "Participant ou réponse introuvable.")
            return redirect(f"{request.path}?page={current_page}")
        except (TypeError, ValueError):
            django_messages.error(
                request, "La valeur fournie n’est pas un nombre valide."
            )
            return redirect(f"{request.path}?page={current_page}")
        django_messages.success(
            request, f"Taille d'écran mise à jour pour {participant_to_update}."
        )
    answers = Answer.objects.filter(
        question__handle="prof-mot-1", participant__in=participants
    )
    answers_map = {a.participant.user.username: a.value for a in answers}
    return render(
        request,
        "admin/admin_change_screen_size.html",
        {
            "participants": participants,
            "answers_map": answers_map,
            "page_obj": page_obj,
        },
    )


@user_passes_test(lambda u: is_admin_team(u))
def admin_dashboard4kids(request):
    study = _get_user_study(request.user)
    participants = ParticipantProfile.objects.filter(study=study)
    total_participants = participants.count()
    dashboard_row = {}
    all_tasks = [
        "general-tutorial",
        "screen-size-params",
        "moteval",
        "ufov",
        "memorability1",
        "workingmemory",
        "memorability2",
    ]
    for p in participants:
        p_row = {}
        # Get tasks duration from extra_json
        tasks_duration = p.extra_json.get("tasks_duration", [])
        p_row["tasks_duration"] = tasks_duration
        # Check for completion
        if p.task_stack_csv == "":
            completed = 1
            if len(tasks_duration) < 5:
                completed = 0
        else:
            completed = -1
        p_row["completed"] = completed
        # Get inscription date
        p_row["inscription_date"] = p.origin_timestamp
        # Get remaining tasks
        task_stack = p.task_stack_csv.split(",") if p.task_stack_csv else []
        task_stack = [t.strip() for t in task_stack if t.strip()]
        p_row["remaining_tasks"] = task_stack
        # Get dates of each task:
        p_row["dates_tasks"] = format_dates(p.extra_json.get("dates_tasks", []))
        dashboard_row[p.user.username] = p_row
    return render(
        request,
        "admin/admin_dashboard4kids.html",
        {
            "dashboard_data": dashboard_row,
            "total_participants": total_participants,
            "all_tasks": all_tasks,
        },
    )


def format_dates(raw_dates):
    parsed_dates = []
    for d in raw_dates:
        dt = parse_datetime(d)
        if dt is not None:
            parsed_dates.append(dt)
    return parsed_dates


@user_passes_test(is_admin_team, login_url="admin_login")
def admin_export(request):
    """
    Page admin (GET) avec boutons de téléchargement.
    """
    if request.method != "GET":
        return HttpResponseNotAllowed(["GET"])
    export_tasks_name = [
        "moteval",
        "ufov",
        "memorability_1",
        "workingmemory",
        "memorability_2",
    ]
    return render(
        request, "admin/admin_export.html", {"export_tasks_name": export_tasks_name}
    )


class _Echo:
    """
    Helper pour StreamingHttpResponse: csv.writer a besoin d'un objet
    avec une méthode write(), et on renvoie directement la valeur.
    """

    def write(self, value):
        return value


@user_passes_test(is_admin_team, login_url="admin_login")
def admin_export_participant_csv(request):
    """
    Endpoint POST qui stream un CSV.
    La logique de récupération de données viendra plus tard.
    """
    if request.method != "POST":
        return HttpResponseNotAllowed(["POST"])
    study = _get_user_study(request.user)
    # Sous-requête: la value de la réponse pour CE participant
    screen_params_sq = Answer.objects.filter(
        participant=OuterRef("pk"), question__handle="prof-mot-1"
    ).values("value")[:1]
    qs = (
        ParticipantProfile.objects.filter(study=study)
        .annotate(screen_params=Subquery(screen_params_sq))
        .select_related("user", "study")
        .order_by("id")
        .values_list("id", "user__username", "origin_timestamp", "screen_params")
    )
    # Nom de fichier: stable et explicite
    ts = timezone.now().strftime("%Y%m%d-%H%M%S")
    filename = f"export-{ts}.csv"

    pseudo_buffer = _Echo()
    writer = csv.writer(pseudo_buffer)

    # TODO: Remplacer par ta logique
    # Exemple minimal: header + quelques lignes
    def row_generator():
        yield writer.writerow(
            ["participant_id", "username", "origin_timestamp", "screen_size"]
        )

        for pid, username, origin_ts, screen_params in qs.iterator(chunk_size=5000):
            yield writer.writerow(
                [
                    pid,
                    username or "",
                    origin_ts.isoformat() if origin_ts else "",
                    screen_params or "",
                ]
            )

    response = StreamingHttpResponse(
        streaming_content=row_generator(),
        content_type="text/csv; charset=utf-8",
    )
    response["Content-Disposition"] = f'attachment; filename="{filename}"'
    return response


@user_passes_test(is_admin_team, login_url="admin_login")
def admin_export_task_csv(request, task_name):
    """
    POST endpoint that streams a CSV for a given cognitive task results.
    """
    if request.method != "POST":
        return HttpResponseNotAllowed(["POST"])
    study = _get_user_study(request.user)

    # Get keys from config file
    try:
        cfg = _load_admin_tasks_results_config()
    except (FileNotFoundError, ValueError, json.JSONDecodeError) as e:
        raise Http404(f"Config export invalide: {e}")

    keys = cfg.get(task_name)
    if not keys:
        # task_name inconnu ou liste vide
        raise Http404(
            f"Aucune configuration de colonnes trouvée pour task_name='{task_name}'."
        )

    if not isinstance(keys, list) or not all(isinstance(k, str) for k in keys):
        raise Http404(
            f"Configuration invalide pour task_name='{task_name}' (liste de strings attendue)."
        )

    task = CognitiveTask.objects.get(name=task_name)
    qs = (
        CognitiveResult.objects.filter(cognitive_task=task, participant__study=study)
        .select_related("participant", "cognitive_task")
        .order_by("id")
        .values_list("participant__id", "participant__user__username", "idx", "results")
    )
    # Nom de fichier: stable et explicite
    ts = timezone.now().strftime("%Y%m%d-%H%M%S")
    filename = f"export-{task_name}-{ts}.csv"

    pseudo_buffer = _Echo()
    writer = csv.writer(pseudo_buffer)

    def row_generator():
        # Header
        yield writer.writerow(["participant_id", "username", "idx", *keys])

        for pid, username, idx, results in qs.iterator(chunk_size=2000):
            results = results or {}
            # Si results n'est pas un dict (cas rare), on évite de planter
            if not isinstance(results, dict):
                results = {}

            yield writer.writerow(
                [pid, username or "", idx, *[results.get(k, "") for k in keys]]
            )

    response = StreamingHttpResponse(
        streaming_content=row_generator(),
        content_type="text/csv; charset=utf-8",
    )
    response["Content-Disposition"] = f'attachment; filename="{filename}"'
    return response


# Cache simple en mémoire (évite de relire le fichier à chaque requête)
_ADMIN_TASKS_CACHE = None


def _load_admin_tasks_results_config() -> dict:
    """
    Charge config/admin_tasks_results.json et retourne un dict.
    Mise en cache mémoire (process) pour limiter l'I/O.
    """
    global _ADMIN_TASKS_CACHE
    if _ADMIN_TASKS_CACHE is not None:
        return _ADMIN_TASKS_CACHE

    config_path = (
        Path(__file__).resolve().parent / "config" / "admin_tasks_results.json"
    )

    if not config_path.exists():
        raise FileNotFoundError(f"Config introuvable: {config_path}")

    with config_path.open("r", encoding="utf-8") as f:
        data = json.load(f)

    if not isinstance(data, dict):
        raise ValueError("admin_tasks_results.json doit contenir un objet JSON (dict).")

    _ADMIN_TASKS_CACHE = data
    return data
