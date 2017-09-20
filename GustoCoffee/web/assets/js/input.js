function setDate()
{
    // ----------- JOUR ---------------

    var firstDivDayValue = document.getElementById("appbundle_reservation_datereservation_day").value;
    var secondDivDayValue = document.getElementById("appbundle_reservation_heuredebut_date_day").value = firstDivDayValue;
    var thirdDivDayValue = document.getElementById("appbundle_reservation_heurefin_date_day").value = firstDivDayValue;

    // ----------- JOUR ---------------

    // ----------- MOIS ---------------

    var firstDivMonthValue = document.getElementById("appbundle_reservation_datereservation_month").value;
    var secondDivMonthValue = document.getElementById("appbundle_reservation_heuredebut_date_month").value = firstDivMonthValue;
    var thirdDivMonthValue = document.getElementById("appbundle_reservation_heurefin_date_month").value = firstDivMonthValue;

    // ----------- MOIS ---------------

    // ----------- MOIS ---------------

    var firstDivYearValue = document.getElementById("appbundle_reservation_datereservation_year").value;
    var secondDivYearValue = document.getElementById("appbundle_reservation_heuredebut_date_year").value = firstDivYearValue;
    var thirdDivYearValue = document.getElementById("appbundle_reservation_heurefin_date_year").value = firstDivYearValue;

    // ----------- MOIS ---------------


}
setDate();