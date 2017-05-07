var CGRectMake = require('CoreGraphics').CGRectMake,
    UIColor = require('UIKit/UIColor'),
    UIScreen = require('UIKit/UIScreen'),
    NSDate = require('Foundation/NSDate'),
    NSDateFormatter = require('Foundation/NSDateFormatter'),
    FSCalendar = require("FSCalendar/FSCalendar");

var FSCalendarDelegate = Hyperloop.defineClass('FSCalendarDelegate', 'NSObject');

var calendar = new FSCalendar();
calendar.frame = CGRectMake(30, 50, 300, 300);

var bounds = UIScreen.mainScreen.bounds;
var dateFormatter = new NSDateFormatter();
dateFormatter.dateFormat = "yyyy-MM-dd";

FSCalendarDelegate.addMethod({
    selector : 'calendar:didDeselectDate:',
    instance : true,
    arguments : ['FSCalendar', 'NSDate'],
    callback : function(calendar, date) {
        if (this.didDeselectDate) {
            Ti.API.info(calendar);
            this.didDeselectDate(calendar, date);
        }
    }
});

FSCalendarDelegate.addMethod({
    selector : 'calendar:didSelectDate:',
    instance : true,
    arguments : ['FSCalendar', 'NSDate', 'FSCalendarMonthPosition'],
    callback : function(calendar, date, position) {
        if (this.didSelectDate) {
            Ti.API.info(calendar);
            this.didSelectDate(calendar, date, position);
        }
    }
});

FSCalendarDelegate.addMethod({
    selector : 'calendar:shouldSelectDate:atMonthPosition:',
    instance : true,
    returnType : 'BOOL',
    arguments : ['FSCalendar', 'NSDate', 'FSCalendarMonthPosition'],
    callback : function(calendar, date, position) {
        Ti.API.info("shouldSelectDate");

        if (this.shouldSelectDate) {
            return this.shouldSelectDate(calendar, date, position);
        }

       
    }
});

FSCalendarDelegate.addMethod({
    selector : 'calendar:boundingRectWillChange:',
    instance : true,
    arguments : ['FSCalendar', 'CGRect', 'BOOL'],
    callback : function(calendar, bounds, animated) {
        if (this.boundingRectWillChange) {
            this.boundingRectWillChange(calendar, date);
        }
    }
});

FSCalendarDelegate.addMethod({
    selector : 'maximumDateForCalendar:',
    instance : true,
    returnType : 'NSDate',
    arguments : ['FSCalendar'],
    callback : function(calendar) {
        if (this.maximumDateForCalendar) {
            return this.maximumDateForCalendar(calendar);
        }
    }
});

FSCalendarDelegate.addMethod({
    selector : 'minimumDateForCalendar:',
    instance : true,
    returnType : 'NSDate',
    arguments : ['FSCalendar'],
    callback : function(calendar) {      
        if (this.minimumDateForCalendar) {
            return this.minimumDateForCalendar(calendar);
        }
    }
});

var delegate = new FSCalendarDelegate();

delegate.shouldSelectDate = function(calendar, date, position) {
    Ti.API.info(date);
    return true;
};

delegate.minimumDateForCalendar = function(calendar) {
    Ti.API.info("minimumDateForCalendar");
    return dateFormatter.dateFromString("2017-03-08");
};

delegate.maximumDateForCalendar = function(calendar) {
    Ti.API.info("maximumDateForCalendar");
    return dateFormatter.dateFromString("2017-11-08");
};

delegate.didDeselectDate = function(calendar, date) {
    Ti.API.info(date);
};

delegate.didSelectDate = function(calendar, date) {
    Ti.API.info(date);
};

delegate.boundingRectWillChange = function(calendar, bounds, animated) {
    Ti.API.info(date);
};

calendar.delegate = delegate;
calendar.dataSource = delegate;
calendar.setToday(null);
// Hide

$.index.add(calendar);
$.index.open();
