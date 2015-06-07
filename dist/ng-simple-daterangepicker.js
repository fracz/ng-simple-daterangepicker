angular.module('ngSimpleDaterangepicker', []).provider('ngSimpleDaterangepicker', function() {
  var defaultOptions;
  defaultOptions = {
    ranges: {
      'Przyszły miesiąc': [moment(), moment().add(1, 'month')],
      'Przyszły tydzień': [moment(), moment().add(7, 'days')],
      'Jutro': [moment().add(1, 'days'), moment().add(1, 'days')],
      'Dzisiaj': [moment(), moment()],
      'Wczoraj': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Ubiegły tydzień': [moment().subtract(7, 'days'), moment()],
      'Ubiegły miesiąc': [moment().subtract(1, 'month'), moment()]
    },
    locale: {
      fromLabel: 'Od',
      toLabel: 'Do',
      applyLabel: 'OK',
      cancelLabel: 'Wyczyść',
      customRangeLabel: 'Inne'
    }
  };
  this.setDefaultOptions = function(options) {
    return defaultOptions = options;
  };
  this.getDefaultOptions = function() {
    return defaultOptions;
  };
  this.$get = function() {
    return {
      getDefaultOptions: function() {
        return defaultOptions;
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
      var config, dateRangePicker, displayableRanges, label, maxDate, minDate, range, rangeIsBetweenMinAndMax, ref;
      minDate = $scope.minDate === 'today' ? moment().startOf('day') : $scope.minDate;
      maxDate = $scope.maxDate === 'today' ? moment().endOf('day') : $scope.maxDate;
      config = angular.extend(ngSimpleDaterangepicker.getDefaultOptions(), $scope.options || {});
      rangeIsBetweenMinAndMax = function(range) {
        return (!minDate || range[0].isAfter(minDate)) && (!maxDate || range[1].isBefore(maxDate));
      };
      displayableRanges = {};
      ref = config.ranges;
      for (label in ref) {
        range = ref[label];
        if (rangeIsBetweenMinAndMax(range)) {
          displayableRanges[label] = range;
        }
      }
      if (maxDate) {
        config.maxDate = maxDate;
      }
      if (minDate) {
        config.minDate = minDate;
      }
      config.ranges = displayableRanges;
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
          dateRangePicker.setStartDate(moment());
          dateRangePicker.setEndDate(moment());
          modelController.$setViewValue(null);
          if (element.val()) {
            return element.val('');
          }
        });
      });
    }
  };
}]);
