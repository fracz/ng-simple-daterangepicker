angular.module('ngSimpleDaterangepicker', []).provider('ngSimpleDaterangepicker', function() {
  var dateRanges, locale;
  dateRanges = {
    'Przyszły tydzień': [moment(), moment().add(7, 'days')],
    'Jutro': [moment().add(1, 'days'), moment().add(1, 'days')],
    'Dzisiaj': [moment(), moment()],
    'Wczoraj': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Ubiegły tydzień': [moment().subtract(7, 'days'), moment()]
  };
  locale = {
    fromLabel: 'Od',
    toLabel: 'Do',
    applyLabel: 'OK',
    cancelLabel: 'Wyczyść',
    customRangeLabel: 'Inne'
  };
  this.setDefaultDateRanges = function(defaultDateRanges) {
    return dateRanges = defaultDateRanges;
  };
  this.setDefaultLocale = function(defaultLocale) {
    return locale = defaultLocale;
  };
  this.$get = function() {
    return {
      getDefaultDateRanges: function() {
        return dateRanges;
      },
      getDefaultLocale: function() {
        return locale;
      }
    };
  };
});

angular.module('ngSimpleDaterangepicker').directive('dateRangePicker', ["$timeout", "ngSimpleDaterangepicker", function($timeout, ngSimpleDaterangepicker) {
  return {
    require: 'ngModel',
    scope: {
      minDate: '=',
      maxDate: '=',
      options: '='
    },
    link: function($scope, element, attrs, modelController) {
      var config, dateRangePicker, displayableRanges, label, maxDate, minDate, range, rangeIsBetweenMinAndMax, ranges;
      minDate = $scope.minDate === 'today' ? moment().startOf('day') : $scope.minDate;
      maxDate = $scope.maxDate === 'today' ? moment().endOf('day') : $scope.maxDate;
      ranges = ngSimpleDaterangepicker.getDefaultDateRanges();
      rangeIsBetweenMinAndMax = function(range) {
        return (!minDate || range[0].isAfter(minDate)) && (!maxDate || range[1].isBefore(maxDate));
      };
      displayableRanges = {};
      for (label in ranges) {
        range = ranges[label];
        if (rangeIsBetweenMinAndMax(range)) {
          displayableRanges[label] = range;
        }
      }
      config = {
        maxDate: maxDate,
        ranges: displayableRanges,
        locale: ngSimpleDaterangepicker.getDefaultLocale()
      };
      config = angular.extend(config, $scope.options);
      element.daterangepicker(config);
      dateRangePicker = element.data('daterangepicker');
      $scope.$watch((function() {
        return modelController.$modelValue;
      }), function(newValue) {
        if (newValue != null ? newValue.startDate : void 0) {
          dateRangePicker.setStartDate(moment(newValue.startDate));
        }
        if (newValue != null ? newValue.endDate : void 0) {
          return dateRangePicker.setEndDate(moment(newValue.endDate));
        }
      });
      return $timeout(function() {
        element.on('apply.daterangepicker', function() {
          return modelController.$setViewValue({
            startDate: moment(dateRangePicker.startDate).toDate(),
            endDate: moment(dateRangePicker.endDate).toDate()
          });
        });
        return element.on('cancel.daterangepicker', function() {
          return modelController.$setViewValue(null);
        });
      });
    }
  };
}]);
