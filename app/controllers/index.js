var CGRectMake = require('CoreGraphics').CGRectMake,
    UIColor = require('UIKit/UIColor'),
    UIScreen = require('UIKit/UIScreen'),
    NSDate = require('Foundation/NSDate');
FSCalendar = require("FSCalendar/FSCalendar");

var FSCalendarDelegate = Hyperloop.defineClass('FSCalendarDelegate', 'NSObject');

var calendar = new FSCalendar();
var bounds = UIScreen.mainScreen.bounds;

calendar.frame = CGRectMake(30, 50, 300, 300);

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
            this.didSelectDate(calendar, date,position);
        }
    }
});
FSCalendarDelegate.addMethod({
    selector : 'calendar:shouldSelectDate:',
    instance : true,
    returnType : 'BOOL',
    arguments : ['FSCalendar', 'NSDate', 'FSCalendarMonthPosition'],
    callback : function(calendar, date, position) {
         Ti.API.info("shouldSelectDate"); 
        
        if (this.shouldSelectDate) {
            return this.shouldSelectDate(calendar, date, position);
        }
         
       // return false;
    }
});
FSCalendarDelegate.addMethod({
    selector : 'calendar:shouldSelect:',
    instance : true,
    returnType : 'BOOL',
    arguments : ['FSCalendar', 'NSDate', 'FSCalendarMonthPosition'],
    callback : function(calendar, date, position) {
        
        if (this.shouldSelect) {
            return this.shouldSelect(calendar, date, position);
        }     
        return false;
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

var delegate = new FSCalendarDelegate();

delegate.shouldSelect = function(calendar, date, position) {
    Ti.API.info(date);
    return false;
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

calendar.setDelegate(delegate);

$.index.add(calendar);

$.index.open();
