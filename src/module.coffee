angular.module('ngSimpleDaterangepicker', [])
.provider 'ngSimpleDaterangepicker', ->

  defaultOptions =
    ranges:
      'Przyszły miesiąc': [moment(), moment().add(1, 'month')]
      'Przyszły tydzień': [moment(), moment().add(7, 'days')]
      'Jutro': [moment().add(1, 'days'), moment().add(1, 'days')]
      'Dzisiaj': [moment(), moment()]
      'Wczoraj': [moment().subtract(1, 'days'), moment().subtract(1, 'days')]
      'Ubiegły tydzień': [moment().subtract(7, 'days'), moment()]
      'Ubiegły miesiąc': [moment().subtract(1, 'month'), moment()]
    locale:
      fromLabel: 'Od'
      toLabel: 'Do'
      applyLabel: 'OK'
      cancelLabel: 'Wyczyść'
      customRangeLabel: 'Inne'

  @setDefaultOptions = (options) ->
    defaultOptions = options

  @getDefaultOptions = ->
    defaultOptions

  @$get = ->
    getDefaultOptions: ->
      defaultOptions

  return
