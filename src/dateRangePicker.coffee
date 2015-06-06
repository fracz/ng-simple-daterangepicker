angular.module('ngSimpleDaterangepicker')
.directive 'dateRangePicker', ($timeout, ngSimpleDaterangepicker) ->
  require: 'ngModel'
  scope:
    minDate: '='
    maxDate: '='
    options: '='
  link: ($scope, element, attrs, modelController) ->
    minDate = if $scope.minDate == 'today' then moment().startOf('day') else $scope.minDate
    maxDate = if $scope.maxDate == 'today' then moment().endOf('day') else $scope.maxDate

    ranges = ngSimpleDaterangepicker.getDefaultDateRanges()

    # calculate which ranges to display based on min and maxDate; range will be displayed only if it fits the min-max period fully
    # this varies from the deafult daterangepicker behavior (it displays the range if it intersects with min-max)
    rangeIsBetweenMinAndMax = (range) ->
      (!minDate or range[0].isAfter(minDate)) and (!maxDate or range[1].isBefore(maxDate))
    displayableRanges = {}
    displayableRanges[label] = range for label, range of ranges when rangeIsBetweenMinAndMax(range)

    config =
      maxDate: maxDate
      ranges: displayableRanges
      locale: ngSimpleDaterangepicker.getDefaultLocale()

    config = angular.extend(config, $scope.options)

    element.daterangepicker(config)

    dateRangePicker = element.data('daterangepicker')

    $scope.$watch (-> modelController.$modelValue), (newValue) ->
      if newValue?.startDate
        dateRangePicker.setStartDate(moment(newValue.startDate))
      if newValue?.endDate
        dateRangePicker.setEndDate(moment(newValue.endDate))

    $timeout ->
      element.on 'apply.daterangepicker', ->
        modelController.$setViewValue
          startDate: moment(dateRangePicker.startDate).toDate()
          endDate: moment(dateRangePicker.endDate).toDate()

      element.on 'cancel.daterangepicker', ->
        modelController.$setViewValue(null)
