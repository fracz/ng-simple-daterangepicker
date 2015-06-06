angular.module('ngSimpleDaterangepicker', [])
.provider 'ngSimpleDaterangepicker', ->
  dateRanges =
    'Przyszły tydzień': [moment(), moment().add(7, 'days')]
    'Jutro': [moment().add(1, 'days'), moment().add(1, 'days')]
    'Dzisiaj': [moment(), moment()]
    'Wczoraj': [moment().subtract(1, 'days'), moment().subtract(1, 'days')]
    'Ubiegły tydzień': [moment().subtract(7, 'days'), moment()]

  locale =
    fromLabel: 'Od'
    toLabel: 'Do'
    applyLabel: 'OK'
    cancelLabel: 'Wyczyść'
    customRangeLabel: 'Inne'

  @setDefaultDateRanges = (defaultDateRanges) ->
    dateRanges = defaultDateRanges

  @setDefaultLocale = (defaultLocale) ->
    locale = defaultLocale

  @$get = ->
    getDefaultDateRanges: ->
      dateRanges

    getDefaultLocale: ->
      locale

  return
