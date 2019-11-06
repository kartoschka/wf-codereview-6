var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// location: [<spot>, <area>, <wider area>]. eg. [<street>, <town>, <country>]
// description: array of strings ~~ list of paragraphs
var SiteOfInterest = /** @class */ (function () {
    function SiteOfInterest(name, location, description, img) {
        if (location === void 0) { location = [null, null, null]; }
        if (description === void 0) { description = []; }
        if (img === void 0) { img = ""; }
        this.name = name;
        this.location = location;
        this.description = description;
        this.img = img;
    }
    SiteOfInterest.prototype.html = function () {
        var htmlobj = document.createElement("div");
        htmlobj.className = "item";
        htmlobj.innerHTML = "\n      <div class=item-imgbox><img class=item-img src=" + this.img + "></div>\n      <h2 class=item-title>" + this.name + "</h2>\n      <div class=item-subtitle>" + this.location.filter(function (x) { return x; }).join("/") + "</div>\n      " + this.pre_text() + "\n      <div class=item-text>" + this.ary2pstr(this.description) + "</div>\n    ";
        return htmlobj;
    };
    SiteOfInterest.prototype.pre_text = function () { return ""; };
    SiteOfInterest.prototype.ary2pstr = function (a) {
        return a.map(function (el) { return "<p>" + el + "</p>"; }).join("\n");
    };
    return SiteOfInterest;
}());
var Place = /** @class */ (function (_super) {
    __extends(Place, _super);
    function Place(type, p1, p2, p3, p4) {
        var _this = _super.call(this, p1, p2, p3, p4) || this;
        _this.type = type;
        return _this;
    }
    Place.prototype.pre_text = function () {
        return "\n      <ul class=item-proplist>\n        <li>Kind of place: " + this.type + "</li>\n      </ul>\n    ";
    };
    return Place;
}(SiteOfInterest));
var Restaurant = /** @class */ (function (_super) {
    __extends(Restaurant, _super);
    function Restaurant(cuisine, phone, priceRange, p1, p2, p3, p4) {
        var _this = _super.call(this, p1, p2, p3, p4) || this;
        _this.cuisine = cuisine;
        _this.phone = phone;
        _this.priceRange = priceRange;
        return _this;
    }
    Restaurant.prototype.pre_text = function () {
        return "\n      <ul class=item-proplist>\n        <li>Cuisine: " + this.cuisine + "</li>\n        <li>Phone: " + this.phone + "</li>\n        <li>Price range: " + this.priceRange + "</li>\n      </ul>\n    ";
    };
    return Restaurant;
}(SiteOfInterest));
// expects date and time in free string format b/c no further data manipulation
// required.
var EventSite = /** @class */ (function (_super) {
    __extends(EventSite, _super);
    function EventSite(date, time, duration, price, p1, p2, p3, p4) {
        var _this = _super.call(this, p1, p2, p3, p4) || this;
        _this.date = date;
        _this.time = time;
        _this.duration = duration;
        _this.price = price;
        return _this;
    }
    EventSite.prototype.pre_text = function () {
        return "\n      <ul class=item-proplist>\n        <li>Date: " + this.date + "</li>\n        <li>Time: " + this.time + "</li>\n        <li>Duration: " + this.duration + "</li>\n        <li>Admission: " + this.price + " EUR</li>\n      </ul>\n    ";
    };
    return EventSite;
}(SiteOfInterest));
var GridWriter = /** @class */ (function () {
    function GridWriter() {
    }
    GridWriter.write = function (objs, root, target) {
        if (root === void 0) { root = document.body; }
        if (!target) {
            target = document.createElement("div");
            target.className = "grid";
        }
        objs.forEach(function (o) { return target.appendChild(o.html()); });
        root.appendChild(target);
    };
    return GridWriter;
}());
