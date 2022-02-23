(function ($) {
    "use strict";
    customUIkitIcons();
    dynamicCssVariables();
    isPageScrolledFromTop();
    schedulCalender();

    camera();

    $(window).resize(function () {
        dynamicCssVariables();
    });

    $(window).on('scroll', function () {
        isPageScrolledFromTop();
    });

    //custom css variables
    function dynamicCssVariables() {
        var ukContainerOffset = $(".uk-container").length ? $(".uk-container").offset().left : 0;
        var siteHeaderHeight = $(".siteHeader").length ? $(".siteHeader").outerHeight() : 0;
        var dashboardHeaderHeight = $(".dashboard-header").length ? $(".dashboard-header").innerHeight() : 0;
        $("body").css({
            "--ukContainerOffset": ukContainerOffset + 'px',
            "--siteHeaderHeight": siteHeaderHeight + 'px',
            "--dashboardHeaderHeight": dashboardHeaderHeight + 'px'
        })
    }

    //custom UIkit Icons
    function customUIkitIcons() {
        UIkit.icon.add({

            /*nav toggler*/
            'overview-icon':

                `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"><path d="M6.443 1H1v5.443h5.443V1ZM14.998 1H9.555v5.443h5.443V1ZM14.998 9.555H9.555v5.443h5.443V9.555ZM6.443 9.555H1v5.443h5.443V9.555Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

            /*close icon */
            'schedule-icon':

                `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" fill="none">
                <path d="M13.802 2.598H2.6a1.6 1.6 0 0 0-1.6 1.6V15.4A1.6 1.6 0 0 0 2.6 17h11.202a1.6 1.6 0 0 0 1.6-1.6V4.198a1.6 1.6 0 0 0-1.6-1.6ZM11.406 1v3.2M5 1v3.2M1 7.406h14.402" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`,

            /*patient icon */
            'patient-icon':
                `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" fill="none">
                <path d="M15.222 16.997V15.22a3.555 3.555 0 0 0-3.555-3.556H4.556A3.556 3.556 0 0 0 1 15.22v1.777M8.11 8.111A3.556 3.556 0 1 0 8.11 1a3.556 3.556 0 0 0 0 7.111Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`,

            /* linkedin icon */
            'linkedin-icon':

                `<svg xmlns="http://www.w3.org/2000/svg" width="29.942" height="29.942" viewBox="0 0 29.942 29.942">
          <path id="Icon_awesome-linkedin" data-name="Icon awesome-linkedin" d="M27.8,2.25H2.132A2.148,2.148,0,0,0,0,4.409V30.033a2.148,2.148,0,0,0,2.132,2.159H27.8a2.154,2.154,0,0,0,2.139-2.159V4.409A2.154,2.154,0,0,0,27.8,2.25ZM9.049,27.915H4.612V13.625H9.056V27.915ZM6.831,11.674A2.573,2.573,0,1,1,9.4,9.1,2.574,2.574,0,0,1,6.831,11.674ZM25.685,27.915H21.247V20.964c0-1.658-.033-3.79-2.306-3.79-2.312,0-2.667,1.8-2.667,3.669v7.071H11.836V13.625h4.257v1.952h.06a4.674,4.674,0,0,1,4.2-2.306c4.491,0,5.327,2.961,5.327,6.81Z" transform="translate(0 -2.25)" fill="#0060b2"/>
        </svg>`
        });
    }


    function isPageScrolledFromTop() {
        if ($(window).scrollTop() > 5) {
            $("body").addClass("scrolledFromTop");
        } else {
            $("body").removeClass("scrolledFromTop");
        }
    }

    // format numbers to 2 decimals 
    function toTwoDecimels(num) {
        return ("0" + (num)).slice(-2);
    }

    function schedulCalender() {

        document.addEventListener('DOMContentLoaded', function () {

            var d = new Date();
            var today = d.getFullYear() + "-" + toTwoDecimels(d.getMonth() + 1) + "-" + toTwoDecimels(d.getDate());

            //
            // schedule calender
            // 
            var scheduleCalendarEl = document.getElementById('scheduleCalender');
            var scheduleCalendar = new FullCalendar.Calendar(scheduleCalendarEl, {
                stickyHeaderDates: true,
                allDaySlot: false,
                headerToolbar: {
                    left: 'title',
                    center: 'timeGridDay,timeGridWeek,dayGridMonth',
                    right: 'prev,today,next '
                },
                titleFormat: { year: 'numeric', month: 'long' },
                initialDate: today,
                slotLabelInterval: "00:30",
                slotMinTime: "07:30",
                dayHeaderFormat: { weekday: 'long', month: 'numeric', day: 'numeric', omitCommas: true },
                navLinks: true,
                droppable: false,
                draggable: false,
                drop: false,
                selectable: true,
                selectMirror: true,
                select: function (arg) {

                    // custom variables 
                    var title = '';
                    var startDate = arg.start.getFullYear() + '-' + toTwoDecimels(arg.start.getMonth() + 1) + '-' + toTwoDecimels(arg.start.getDate());
                    var endDate = arg.endStr;
                    var startTIme = toTwoDecimels(arg.start.getHours()) + ':' + toTwoDecimels(arg.start.getMinutes()) + ':' + toTwoDecimels(arg.start.getSeconds());
                    var endTime = toTwoDecimels(arg.end.getHours()) + ':' + toTwoDecimels(arg.end.getMinutes()) + ':' + toTwoDecimels(arg.end.getSeconds());

                    // setting up the modal before showing
                    UIkit.modal("#schedule-modal").show();
                    $("#schedule-modal-Date").val(startDate);
                    $("#schedule-modal-Time-start").val(startTIme);
                    $("#schedule-modal-Time-end").val(endTime);


                    // getting values from modal 
                    $("button#schedule").click(function () {
                        var address = $("#schedule-modal-Address").val();
                        var phone = $("#schedule-modal-Phone").val();
                        var startTime = $("#schedule-modal-Time-start").val();
                        var endTime = $("#schedule-modal-Time-end").val();
                        var status = $("#schedule-patient-status").val();
                        var note = $("#schedule-modal-Note").val();
                        title = $("#schedule-modal-Name").val() + ' - ' + note;

                        if (title) {
                            scheduleCalendar.addEvent({
                                title: title,
                                start: arg.start,
                                end: arg.end,
                                allDay: arg.allDay,
                                extendedProps: {
                                    address: address,
                                    phone: phone,
                                    status: status,
                                    note: note
                                },
                            })
                        }

                        UIkit.modal("#schedule-modal").hide();
                        scheduleCalendar.setOption('windowResize');
                        renderEventCalender();
                    });
                    scheduleCalendar.unselect()
                },
                eventClick: function (arg) {
                    if (confirm('Are you sure you want to delete this event?')) {
                        arg.event.remove();
                        renderEventCalender();
                    }
                },
                editable: true,
                dayMaxEvents: true, // allow "more" link when too many events
                events: [
                    {
                        title: 'All Day Event',
                        start: '2020-09-01'
                    },
                    {
                        title: 'Birthday Party',
                        start: '2022-03-13T07:00:00'
                    },
                    {
                        title: 'Click for Google',
                        start: '2022-02-06'
                    }
                ]
            });
            scheduleCalendar.render();


            //
            // date select for event list calender 
            //
            function renderEventDateCalender() {
                var eventDateCalendarEl = document.getElementById('calender-date-select');
                var eventDateCalendar = new FullCalendar.Calendar(eventDateCalendarEl, {
                    selectable: true,
                    select: function (arg) {
                        var date = arg.start.getFullYear() + '-' + toTwoDecimels(arg.start.getMonth() + 1) + '-' + toTwoDecimels(arg.start.getDate());
                        renderEventCalender(date);
                    }
                });
                eventDateCalendar.render();
            }
            renderEventDateCalender();



            //
            // event list calender 
            //
            function renderEventCalender(date) {
                var eventCalendarEl = document.getElementById('calender-event-list');
                var eventCalendar = new FullCalendar.Calendar(eventCalendarEl, {
                    allDaySlot: false,
                    headerToolbar: false,
                    initialView: 'listDay',
                    initialDate: date,
                    events: scheduleCalendar.getEvents(),
                    dayHeaderContent: { html: `` }

                });
                eventCalendar.render();
                var eventCount = $("#calender-event-list tbody .fc-event").length;
                if (eventCount == 1)
                    jQuery("#calender-event-list .fc-list-day-cushion").html(`${eventCount} Appointment Today`);
                else
                    jQuery("#calender-event-list .fc-list-day-cushion").html(`${eventCount} Appointments Today`);
            }
            renderEventCalender(today);

        });
    }

    jQuery("#scheduleCalender").on('DOMSubtreeModified', function () {

        jQuery(".fc-col-header-cell").each(function () {
            jQuery(this).height(jQuery(this).width() / 1.5);
        })

        jQuery(".fc-timegrid-slot").each(function () {
            jQuery(this).height(jQuery(this).width() / 10);
        })

        $("#scheduleCalender .fc-daygrid-day").height($("#scheduleCalender .fc-daygrid-day").width())
    });

    var firstTime = true;
    $("#calender-event-list").on("click", ".fc-list-event", function () {
        UIkit.modal("#schedule-view-modal").show();
        if (firstTime) {
            $("#schedule-view-modal .edit-btn").click();
            firstTime = false;
        }
    })

    $("#schedule-view-modal .edit-btn").click(function () {

        var $listSort = $('#schedule-view-modal form *');
        if ($listSort.attr('disabled')) {
            $listSort.removeAttr('disabled');
            $(this).find("[uk-icon]").attr("uk-icon", "icon: check");
        } else {
            $listSort.attr('disabled', "disabled");
            $(this).find("[uk-icon]").attr("uk-icon", "icon: pencil");
        }
    })


    function camera() {
        $(function () {

            if ($("#camera").length) {
                console.log("yea?");
                $('#control').hide();
                $('#video').resize(function () {
                    $('#control').show();
                });
                function opencam() {
                    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.oGetUserMedia || navigator.msGetUserMedia;
                    if (navigator.getUserMedia) {
                        navigator.getUserMedia({ video: true }, streamWebCam, throwError);
                    }

                }

                function closecam() {

                    video.pause();

                    try {
                        video.srcObject = null;
                    } catch (error) {
                        video.src = null;
                    }

                    var track = strr.getTracks()[0];  // if only one media track
                    // ...
                    track.stop();

                }
                var video = document.getElementById('video');
                var canvas = document.getElementById('canvas');
                var context = canvas.getContext('2d');
                var strr;
                function streamWebCam(stream) {
                    const mediaSource = new MediaSource(stream);
                    try {
                        video.srcObject = stream;
                    } catch (error) {
                        video.src = URL.createObjectURL(mediaSource);
                    }
                    video.play();
                    strr = stream;
                }
                function throwError(e) {
                    alert(e.name);
                }
                $('#open').click(function (event) {
                    opencam();
                    $('#control').show();
                });
                $('#close').click(function (event) {
                    closecam();
                });
                $('#snap').click(function (event) {
                    canvas.width = video.clientWidth;
                    canvas.height = video.clientHeight;
                    context.drawImage(video, 0, 0);
                    $('#vid').css('z-index', '20');
                    $('#capture').css('z-index', '30');
                });
                $('#retake').click(function (event) {
                    $('#vid').css('z-index', '30');
                    $('#capture').css('z-index', '20');
                });
            }


        });
    }

}($));

