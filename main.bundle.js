webpackJsonp([1,4],{

/***/ 129:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__configs_app_config__ = __webpack_require__(24);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImageService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ImageService = (function () {
    function ImageService(appConfig, http) {
        this.appConfig = appConfig;
        this.http = http;
        this.myCache = new Map();
    }
    /**
     * Resize image by google sevice proxy
     * @param path
     * @param width
     * @param height
     * @param timeToLive - time (in second) to cache at server, default 10 days
     */
    ImageService.prototype.resizeImage = function (path, width, height, timeToLive) {
        var url = "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?url=" + path + "&container=focus" + (width ? "&resize_w=" + width : "") + (height ? "&resize_h=" + height : "") + (timeToLive ? "&refresh=" + timeToLive : "&refresh=846000");
        return url;
    };
    ImageService.prototype.getAlbumArt = function (albumArtId, width, height) {
        var _this = this;
        if (this.myCache.has(albumArtId)) {
            var url = this.myCache.get(albumArtId);
            return Promise.resolve(this.resizeImage(url, width, height));
        }
        var fileId = albumArtId ? albumArtId : this.appConfig.defaultAlbumArtId;
        return this.http.get(this.appConfig.serviceApiUrl + "/api/v1/files/redirect-link?fileId=" + fileId)
            .toPromise().then(function (response) {
            var data = JSON.parse(response["_body"]);
            _this.myCache.set(albumArtId, data["redirectUrl"]);
            return _this.resizeImage(data["redirectUrl"], width, height);
        }).catch(function (err) { return ""; });
    };
    ImageService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__configs_app_config__["a" /* AppConfig */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__configs_app_config__["a" /* AppConfig */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _b) || Object])
    ], ImageService);
    return ImageService;
    var _a, _b;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/image.service.js.map

/***/ }),

/***/ 130:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_hit_list_model__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__configs_app_config__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auth_service__ = __webpack_require__(144);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlaylistService; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PlaylistService = (function (_super) {
    __extends(PlaylistService, _super);
    function PlaylistService(http, appConfig, authService) {
        _super.call(this, http, appConfig.serviceApiUrl + "/api/v1/playlists/");
        this.appConfig = appConfig;
        this.authService = authService;
    }
    /**
     * Query playlist
     * @param {number} page
     * @param {number} size
     * @param {string} q - srearch term
     * @param {string} order - field:direction
     */
    PlaylistService.prototype.query = function (page, size, q, order) {
        if (page === void 0) { page = 0; }
        var url = this.apiUrl + "?page=" + page;
        if (typeof size === "number") {
            url += "&size=" + size;
        }
        if (typeof q === "string") {
            url += "&q=" + q;
        }
        if (typeof order === "string") {
            url += "&order=" + order;
        }
        return this.http.get(url)
            .toPromise()
            .then(function (response) {
            var data = JSON.parse(response["_body"]);
            return new __WEBPACK_IMPORTED_MODULE_2__models_hit_list_model__["a" /* HitList */](data);
        })
            .catch(this.handleError);
    };
    PlaylistService.prototype.listMyPlaylists = function () {
        //TO DO
        return this.query(0, 100);
    };
    PlaylistService.prototype.addTrack = function (trackId, playlistIds) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ "Content-Type": "application/json" });
        headers.append("XToken", this.authService.getToken());
        var jData = {
            "trackId": trackId + "",
            "playlistIds": playlistIds
        };
        return this.http
            .post(this.apiUrl + "add-track", JSON.stringify(jData), { headers: headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    PlaylistService.prototype.upview = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append("Content-Type", "application/json");
        return this.http.post(this.apiUrl + id + "/upview", "", { headers: headers })
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    PlaylistService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__configs_app_config__["a" /* AppConfig */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__configs_app_config__["a" /* AppConfig */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__auth_service__["a" /* AuthService */]) === 'function' && _c) || Object])
    ], PlaylistService);
    return PlaylistService;
    var _a, _b, _c;
}(__WEBPACK_IMPORTED_MODULE_3__service__["a" /* Service */]));
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/playlist.service.js.map

/***/ }),

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StringUtil; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var StringUtil = (function () {
    function StringUtil() {
    }
    StringUtil.prototype.convertoUnsignKeepSpace = function (text) {
        if (typeof (text) !== "string") {
            return "";
        }
        var i = 0, n = text.length, rs = "";
        for (i = 0; i < n; i++) {
            if (text[i] === " ") {
                rs += " ";
            }
            else if (StringUtil.UNSIGN_CHAR_MAP.hasOwnProperty(text[i])) {
                rs += StringUtil.UNSIGN_CHAR_MAP[text[i]];
            }
            else {
                rs += text[i];
            }
        }
        return rs;
    };
    StringUtil.prototype.convertoUnsign = function (text) {
        if (text == undefined || text == null || typeof (text) !== "string") {
            return "";
        }
        var i = 0, n = text.length, rs = "";
        for (var i = 0; i < n; i++) {
            if (StringUtil.UNSIGN_CHAR_MAP.hasOwnProperty(text[i])) {
                rs += StringUtil.UNSIGN_CHAR_MAP[text[i]];
            }
            else {
                rs += text[i];
            }
        }
        return rs;
    };
    StringUtil.prototype.convertTime = function (seconds, hasUnit) {
        if (hasUnit === void 0) { hasUnit = false; }
        if (seconds < 60) {
            if (seconds < 10) {
                return hasUnit ? "00 min 0" + seconds + " s" : "00:0" + seconds;
            }
            return hasUnit ? "00 min " + seconds + " s" : "00:" + seconds;
        }
        var min = Math.floor(seconds / 60);
        var sec = seconds % 60;
        var s = "";
        if (min < 60) {
            if (min < 10) {
                s += "0" + min + (hasUnit ? " min " : ":");
            }
            else {
                s += min + (hasUnit ? " min " : ":");
            }
            if (sec < 10) {
                s += "0" + sec + (hasUnit ? " s" : "");
            }
            else {
                s += sec + (hasUnit ? " s" : "");
            }
            return s;
        }
        var h = Math.floor(min / 60);
        min = min % 60;
        s = h + (hasUnit ? " h " : ":");
        if (min < 10) {
            s += "0" + min + (hasUnit ? " min " : ":");
        }
        else {
            s += min + (hasUnit ? " min " : ":");
        }
        if (sec < 10) {
            s += "0" + sec + (hasUnit ? " sec" : "");
        }
        else {
            s += sec + (hasUnit ? " sec" : "");
        }
        return s;
    };
    StringUtil.prototype.toUTF8Array = function (str) {
        var utf8 = [];
        for (var i = 0; i < str.length; i++) {
            var charcode = str.charCodeAt(i);
            if (charcode < 0x80)
                utf8.push(charcode);
            else if (charcode < 0x800) {
                utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
            }
            else if (charcode < 0xd800 || charcode >= 0xe000) {
                utf8.push(0xe0 | (charcode >> 12), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
            }
            else {
                i++;
                // UTF-16 encodes 0x10000-0x10FFFF by
                // subtracting 0x10000 and splitting the
                // 20 bits of 0x0-0xFFFFF into two halves
                charcode = 0x10000 + (((charcode & 0x3ff) << 10)
                    | (str.charCodeAt(i) & 0x3ff));
                utf8.push(0xf0 | (charcode >> 18), 0x80 | ((charcode >> 12) & 0x3f), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
            }
        }
        return utf8;
    };
    StringUtil.prototype.fromUTF8Array = function (data) {
        var str = "", i;
        for (i = 0; i < data.length; i++) {
            var value = data[i];
            if (value < 0x80) {
                str += String.fromCharCode(value);
            }
            else if (value > 0xBF && value < 0xE0) {
                str += String.fromCharCode((value & 0x1F) << 6 | data[i + 1] & 0x3F);
                i += 1;
            }
            else if (value > 0xDF && value < 0xF0) {
                str += String.fromCharCode((value & 0x0F) << 12 | (data[i + 1] & 0x3F) << 6 | data[i + 2] & 0x3F);
                i += 2;
            }
            else {
                // surrogate pair
                var charCode = ((value & 0x07) << 18 | (data[i + 1] & 0x3F) << 12 | (data[i + 2] & 0x3F) << 6 | data[i + 3] & 0x3F) - 0x010000;
                str += String.fromCharCode(charCode >> 10 | 0xD800, charCode & 0x03FF | 0xDC00);
                i += 3;
            }
        }
        return str;
    };
    StringUtil.UNSIGN_CHAR_MAP = {
        "Á": "A",
        "À": "A",
        "Ả": "A",
        "Ã": "A",
        "Ạ": "A",
        "Ă": "A",
        "Ắ": "A",
        "Ằ": "A",
        "Ẳ": "A",
        "Ẵ": "A",
        "Ặ": "A",
        "Â": "A",
        "Ấ": "A",
        "Ầ": "A",
        "Ẩ": "A",
        "Ẫ": "A",
        "Ậ": "A",
        "á": "a",
        "à": "a",
        "ả": "a",
        "ã": "a",
        "ạ": "a",
        "ă": "a",
        "ắ": "a",
        "ằ": "a",
        "ẳ": "a",
        "ẵ": "a",
        "ặ": "a",
        "â": "a",
        "ấ": "a",
        "ầ": "a",
        "ẩ": "a",
        "ẫ": "a",
        "ậ": "a",
        "Đ": "D",
        "đ": "d",
        "É": "E",
        "È": "E",
        "Ẻ": "E",
        "Ẽ": "E",
        "Ẹ": "E",
        "Ê": "E",
        "Ế": "E",
        "Ề": "E",
        "Ể": "E",
        "Ễ": "E",
        "Ệ": "E",
        "é": "e",
        "è": "e",
        "ẻ": "e",
        "ẽ": "e",
        "ẹ": "e",
        "ê": "e",
        "ế": "e",
        "ề": "e",
        "ể": "e",
        "ễ": "e",
        "ệ": "e",
        "Í": "I",
        "Ì": "I",
        "Ỉ": "I",
        "Ĩ": "I",
        "Ị": "I",
        "í": "i",
        "ì": "i",
        "ĩ": "i",
        "ị": "i",
        "Ó": "O",
        "Ò": "O",
        "Ỏ": "O",
        "Õ": "O",
        "Ọ": "O",
        "Ô": "O",
        "Ố": "O",
        "Ồ": "O",
        "Ổ": "O",
        "Ỗ": "O",
        "Ộ": "O",
        "Ơ": "O",
        "Ớ": "O",
        "Ờ": "O",
        "Ở": "O",
        "Ỡ": "O",
        "Ợ": "O",
        "ó": "o",
        "ò": "o",
        "ỏ": "o",
        "õ": "o",
        "ọ": "o",
        "ô": "o",
        "ố": "o",
        "ồ": "o",
        "ổ": "o",
        "ỗ": "o",
        "ộ": "o",
        "ơ": "o",
        "ớ": "o",
        "ờ": "o",
        "ở": "o",
        "ỡ": "o",
        "ợ": "o",
        "Ú": "U",
        "Ù": "U",
        "Ủ": "U",
        "Ũ": "U",
        "Ụ": "U",
        "Ư": "U",
        "Ứ": "U",
        "Ừ": "U",
        "Ử": "U",
        "Ữ": "U",
        "Ự": "U",
        "ú": "u",
        "ù": "u",
        "ủ": "u",
        "ũ": "u",
        "ụ": "u",
        "ư": "u",
        "ứ": "u",
        "ừ": "u",
        "ử": "u",
        "ữ": "u",
        "ự": "u",
        "Ý": "Y",
        "Ỳ": "Y",
        "Ỷ": "Y",
        "Ỹ": "Y",
        "Ỵ": "Y",
        "ý": "y",
        "ỳ": "y",
        "ỷ": "y",
        "ỹ": "y",
        "ỵ": "y",
        " ": "-",
        "\t": "-",
        "<": "-",
        ">": "-",
        "*": "-",
        "%": "-",
        "&": "-",
        ":": "-",
        "\\": "-",
        "/": "-"
    };
    StringUtil = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], StringUtil);
    return StringUtil;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/string.util.js.map

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__configs_app_config__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_hit_list_model__ = __webpack_require__(255);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArtistService; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ArtistService = (function (_super) {
    __extends(ArtistService, _super);
    function ArtistService(http, appConfig) {
        _super.call(this, http, appConfig.serviceApiUrl + "/api/v1/artists/");
        this.appConfig = appConfig;
    }
    /**
     * List id name
     */
    ArtistService.prototype.listIdName = function () {
        var url = this.apiUrl + "list-id-name";
        return this.http.get(url)
            .toPromise()
            .then(function (response) {
            var data = JSON.parse(response["_body"]);
            return new __WEBPACK_IMPORTED_MODULE_4__models_hit_list_model__["a" /* HitList */](data).hits;
        }).catch(this.handleError);
    };
    /**
     * Query artist
     * @param {number} page
     * @param {number} pageSize
     * @param {string} q - srearch term
     * @param {string} order - field:asc,field2:desc
     */
    ArtistService.prototype.query = function (page, size, q, order) {
        if (page === void 0) { page = 0; }
        var url = this.apiUrl + "?page=" + page;
        if (typeof size === "number") {
            url += "&size=" + size;
        }
        if (typeof q === "string") {
            url += "&q=" + q;
        }
        if (typeof order === "string") {
            url += "&order=" + order;
        }
        return this.http.get(url)
            .toPromise()
            .then(function (response) {
            var data = JSON.parse(response["_body"]);
            return new __WEBPACK_IMPORTED_MODULE_4__models_hit_list_model__["a" /* HitList */](data);
            //            let hitList = new HitList<Artist>(data);
            //                hitList.total = data.length;
            //                hitList.count = data.length;
            //            for(let i = 0; i < hitList.count; i++) {
            //                let item = data[i];
            //                hitList.hits.push(item as Artist);
            //            }
            //            return hitList;
        })
            .catch(this.handleError);
    };
    ArtistService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__configs_app_config__["a" /* AppConfig */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__configs_app_config__["a" /* AppConfig */]) === 'function' && _b) || Object])
    ], ArtistService);
    return ArtistService;
    var _a, _b;
}(__WEBPACK_IMPORTED_MODULE_2__service__["a" /* Service */]));
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/artist.service.js.map

/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_service__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__configs_app_config__ = __webpack_require__(24);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AuthService = (function () {
    function AuthService(router, userService, appConfig) {
        this.router = router;
        this.userService = userService;
        this.appConfig = appConfig;
        this.init();
    }
    AuthService.prototype.init = function () {
        var p = localStorage.getItem("permission");
        if (p !== null || p === undefined) {
            this.permissions = p.split(",");
        }
        else {
            this.permissions = [];
        }
        this.permissions.push("login");
        //Object.values(this.appConfig.permissions).forEach((item, i) => this.permissions.push(item));
    };
    AuthService.prototype.reset = function () {
        this.auth = null;
        this.permissions = ["login"];
        localStorage.removeItem("token");
        localStorage.removeItem("permission");
    };
    AuthService.prototype.logout = function () {
        this.reset();
        return this.userService.rejectToken(this.getRefreshToken());
    };
    AuthService.prototype.login = function (user) {
        return this.userService.authenticate(user);
    };
    AuthService.prototype.storeToken = function (data) {
        this.permissions = data["permissions"];
        localStorage.setItem("permission", this.permissions.toString());
        localStorage.setItem("token", data["token"]);
        localStorage.setItem("refreshToken", data["refreshToken"]);
        return true;
    };
    AuthService.prototype.getToken = function () {
        return localStorage.getItem("token");
    };
    AuthService.prototype.getRefreshToken = function () {
        return localStorage.getItem("refreshToken");
    };
    AuthService.prototype.checkPermission = function (permisson) {
        var i;
        var n = this.permissions.length;
        for (i = 0; i < n; i++) {
            if (this.permissions[i] === permisson) {
                return true;
            }
        }
        return false;
    };
    AuthService.prototype.parseJwt = function (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    };
    AuthService.prototype.isAuthenticated = function () {
        if (this.auth == null) {
            var token = this.getToken();
            if (token) {
                this.auth = this.parseJwt(token);
            }
        }
        return this.auth != null;
    };
    AuthService.prototype.isTokenExpired = function () {
        if (this.isAuthenticated()) {
            return (this.auth["exp"] - Date.now()) > 3000000;
        }
        return true;
    };
    AuthService.prototype.getUsername = function () {
        if (this.isAuthenticated()) {
            return this.auth["username"];
        }
        return null;
    };
    AuthService.prototype.refreshToken = function () {
        var _this = this;
        if (this.isAuthenticated()) {
            if (this.isTokenExpired()) {
                this.userService.refreshToken(this.getRefreshToken()).then(function (data) { return _this.storeToken(data); });
            }
        }
    };
    AuthService.prototype.checkCredentials = function () {
        if (localStorage.getItem("token") === null) {
            this.router.navigate(["/login"]);
        }
    };
    AuthService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__user_service__["a" /* UserService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__configs_app_config__["a" /* AppConfig */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__configs_app_config__["a" /* AppConfig */]) === 'function' && _c) || Object])
    ], AuthService);
    return AuthService;
    var _a, _b, _c;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/auth.service.js.map

/***/ }),

/***/ 216:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Pagination; });
var Pagination = (function () {
    function Pagination() {
        this.pageSize = 20;
        this.maxNumOfPages = 10;
        this.numOfPages = 1;
        this.startPage = 0;
        this.endPage = 0;
        this.currentPage = 0;
    }
    Pagination.prototype.generatePageIds = function () {
        var pageIds = [];
        for (var i = this.startPage; i <= this.endPage; i++) {
            pageIds.push(i);
        }
        return pageIds;
    };
    Pagination.prototype.detectNextPagination = function () {
        if (this.numOfPages > this.maxNumOfPages) {
            var curr = this.endPage + 1;
            if (curr < this.numOfPages) {
                var end = curr + Math.floor(this.maxNumOfPages / 2);
                while (end >= this.numOfPages) {
                    end--;
                }
                var start = curr - Math.floor(this.maxNumOfPages / 2);
                while (start < 0) {
                    start++;
                }
                var newPagination = new Pagination();
                newPagination.pageSize = this.pageSize;
                newPagination.maxNumOfPages = this.maxNumOfPages;
                newPagination.numOfPages = this.numOfPages;
                newPagination.startPage = start;
                newPagination.endPage = end;
                newPagination.currentPage = curr;
                return newPagination;
            }
        }
        return this;
    };
    Pagination.prototype.detectPrePagination = function () {
        if (this.numOfPages > this.maxNumOfPages) {
            var curr = this.startPage - 1;
            if (curr >= 0) {
                var end = curr + Math.floor(this.maxNumOfPages / 2);
                while (end >= this.numOfPages) {
                    end--;
                }
                var start = curr - Math.floor(this.maxNumOfPages / 2);
                while (start < 0) {
                    start++;
                }
                var newPagination = new Pagination();
                newPagination.pageSize = this.pageSize;
                newPagination.maxNumOfPages = this.maxNumOfPages;
                newPagination.numOfPages = this.numOfPages;
                newPagination.startPage = start;
                newPagination.endPage = end;
                newPagination.currentPage = curr;
                return newPagination;
            }
        }
        return this;
    };
    return Pagination;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/pagination.model.js.map

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Service; });


var Service = (function () {
    function Service(http, apiUrl) {
        this.http = http;
        this.apiUrl = apiUrl;
    }
    Service.prototype.getAll = function () {
        return this.http.get(this.apiUrl)
            .toPromise()
            .then(function (response) { return JSON.parse(response["_body"]); })
            .catch(this.handleError);
    };
    Service.prototype.getMany = function () {
        return this.http.get(this.apiUrl)
            .toPromise()
            .then(function (response) { return JSON.parse(response["_body"]); })
            .catch(this.handleError);
    };
    Service.prototype.getOne = function (id) {
        return this.http.get(this.apiUrl + id)
            .toPromise()
            .then(function (response) { return JSON.parse(response["_body"]); })
            .catch(this.handleError);
    };
    Service.prototype.save = function (entity) {
        if (entity._id || entity.id) {
            return this.put(entity);
        }
        return this.post(entity);
    };
    Service.prototype.delete = function (entity) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["Headers"]();
        headers.append("Content-Type", "application/json");
        var url = this.apiUrl + "/" + entity._id;
        return this.http
            .delete(url, {})
            .toPromise()
            .catch(this.handleError);
    };
    // Add new entity
    Service.prototype.post = function (entity) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["Headers"]({ "Content-Type": "application/json" });
        headers.append("XToken", localStorage.getItem("token"));
        return this.http
            .post(this.apiUrl, JSON.stringify(entity), { headers: headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    // Update existing entity
    Service.prototype.put = function (entity) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["Headers"]();
        headers.append("Content-Type", "application/json");
        headers.append("XToken", localStorage.getItem("token"));
        var url = this.apiUrl + (entity._id || entity.id);
        return this.http
            .put(url, JSON.stringify(entity), { headers: headers })
            .toPromise()
            .then(function () { return entity; })
            .catch(this.handleError);
    };
    Service.prototype.handleError = function (error) {
        console.error("An error occurred", error);
        return Promise.reject(error.message || error);
    };
    return Service;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/service.js.map

/***/ }),

/***/ 233:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 233;


/***/ }),

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppConfig; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppConfig = (function () {
    function AppConfig() {
        this.serverApiUrl = "https://music-tbox.rhcloud.com";
        this.serviceApiUrl = "http://tmusic-ttapp.7e14.starter-us-west-2.openshiftapps.com";
        this.imageHostUrl = "http://tmusic-trungthao379.rhcloud.com.rsz.io";
        this.defaultAlbumArtId = "0BxJ5EROKWv0dNGpNOWdJVW5kTEU";
        this.authApiUrl = "https://authentication-379.rhcloud.com/api/auth";
        this.appId = "520520520520520520520520";
        this.permissions = {
            LOGIN: "login",
            MANAGE_USERS: "MU",
            MANAGE_ARTISTS: "MA",
            CREATE_ARTIST: "CA",
            UPDATE_ARTIST: "EA",
            DELETE_ARTIST: "DA",
            LIST_ARTIST: "LA",
            MANAGE_TRACKS: "MT",
            CREATE_TRACK: "CT",
            UPDATE_TRACK: "ET",
            DELETE_TRACK: "DT",
            LIST_TRACK: "LT",
            MANAGE_PLAYLISTS: "MPL",
            CREATE_PLAYLIST: "CPL",
            UPDATE_PLAYLIST: "UPL",
            DELETE_PLAYLIST: "DPL",
            LIST_PLAYLIST: "LPL"
        };
    }
    AppConfig = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], AppConfig);
    return AppConfig;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/app.config.js.map

/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Entity; });
var Entity = (function () {
    function Entity() {
    }
    return Entity;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/entity.model.js.map

/***/ }),

/***/ 255:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HitList; });
var HitList = (function () {
    function HitList(data) {
        var _this = this;
        this.total = 0;
        this.count = 0;
        this.hits = [];
        if (typeof data === "object" && data !== null) {
            //TODO Remove this case
            if (data["totalDisplayRecords"]) {
                this.total = data["totalDisplayRecords"];
                this.count = data["totalRecords"];
                for (var i = 0; i < this.count; i++) {
                    var item = data["aaData"][i];
                    this.hits.push(item);
                }
            }
            else {
                this.total = data["total"];
                this.count = data["count"];
                data["hits"].forEach(function (item) { return _this.hits.push(item); });
            }
        }
    }
    return HitList;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/hit-list.model.js.map

/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_track_model__ = __webpack_require__(578);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__track_service__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__image_service__ = __webpack_require__(129);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AudioPlayer; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AudioPlayer = (function () {
    function AudioPlayer(trackService, imageService) {
        this.trackService = trackService;
        this.imageService = imageService;
        //keep audio player data
        this.track = new __WEBPACK_IMPORTED_MODULE_1__models_track_model__["a" /* Track */]();
        this.arrTrack = [];
        this.trackIndex = 0;
        this.shouldShowPersistent = false;
        this.fnOnEnded = null;
        this.flagLoop = true;
        this.elemAudio = document.createElement("audio");
    }
    AudioPlayer.prototype.setAttributes = function (attibutes) {
        for (var key in attibutes) {
            this.elemAudio[key] = attibutes[key];
        }
    };
    AudioPlayer.prototype.setSource = function (src) {
        this.elemAudio["src"] = src;
    };
    AudioPlayer.prototype.play = function () {
        if (!this.isPlaying()) {
            this.elemAudio["play"]();
        }
    };
    AudioPlayer.prototype.pause = function () {
        if (this.isPlaying()) {
            this.elemAudio["pause"]();
        }
    };
    AudioPlayer.prototype.stop = function () {
        this.pause();
        this.setSource("");
    };
    AudioPlayer.prototype.onTimeUpdate = function (fnOnTimeUpdate) {
        this.elemAudio.addEventListener("timeupdate", fnOnTimeUpdate);
        return fnOnTimeUpdate;
    };
    AudioPlayer.prototype.onPlay = function (fnOnplay) {
        this.elemAudio.addEventListener("play", fnOnplay);
        return fnOnplay;
    };
    AudioPlayer.prototype.onPause = function (fnOnPause) {
        this.elemAudio.addEventListener("pause", fnOnPause);
        return fnOnPause;
    };
    AudioPlayer.prototype.onEnded = function (fnOnEnded) {
        this.elemAudio.addEventListener("ended", fnOnEnded);
        return fnOnEnded;
    };
    AudioPlayer.prototype.removeOnTimeUpdate = function (fnOnTimeUpdate) {
        this.elemAudio.removeEventListener("timeupdate", fnOnTimeUpdate);
        return fnOnTimeUpdate;
    };
    AudioPlayer.prototype.removeOnPlay = function (fnOnplay) {
        this.elemAudio.removeEventListener("play", fnOnplay);
        return fnOnplay;
    };
    AudioPlayer.prototype.removeOnPause = function (fnOnPause) {
        this.elemAudio.removeEventListener("pause", fnOnPause);
        return fnOnPause;
    };
    AudioPlayer.prototype.removeOnEnded = function (fnOnEnded) {
        this.elemAudio.removeEventListener("ended", fnOnEnded);
        return fnOnEnded;
    };
    AudioPlayer.prototype.getCurrentTime = function () {
        return this.elemAudio["currentTime"];
    };
    AudioPlayer.prototype.getDuration = function () {
        return this.elemAudio["duration"];
    };
    AudioPlayer.prototype.seek = function (currentTime) {
        if (currentTime < 0 || currentTime > this.getDuration()) {
            return;
        }
        this.elemAudio["currentTime"] = currentTime;
    };
    AudioPlayer.prototype.isPlaying = function () {
        return !this.elemAudio["paused"];
    };
    AudioPlayer.prototype.getSource = function () {
        return this.elemAudio["src"];
    };
    AudioPlayer.prototype.isLoop = function () {
        return this.flagLoop;
    };
    AudioPlayer.prototype.setLoop = function (loop) {
        this.flagLoop = loop;
    };
    AudioPlayer.prototype.setVolume = function (volume) {
        if (volume < 0 || volume > 1) {
            return;
        }
        this.elemAudio.volume = volume;
    };
    AudioPlayer.prototype.getVolume = function () {
        return this.elemAudio.volume;
    };
    AudioPlayer.prototype.setMuted = function (muted) {
        this.elemAudio.muted = muted;
    };
    AudioPlayer.prototype.isMuted = function () {
        return this.elemAudio.muted;
    };
    AudioPlayer.prototype.playTrack = function (index) {
        var _this = this;
        if (index < 0 || index >= this.arrTrack.length) {
            return Promise.reject("Index is oversize: " + index + " in " + this.arrTrack.length);
        }
        var item = this.arrTrack[index];
        return this.trackService.getOne(item.id + "").then(function (track) {
            _this.track = track;
            _this.trackIndex = index;
            _this.setAttributes({ "type": "audio/mp3" });
            _this.trackService.getTrackSource(track.fileId).then(function (src) {
                _this.setAttributes({ "crossOrigin": "anonymous" });
                _this.setSource(src);
                //render visulization
            }).catch(function (err) {
                _this.setAttributes({ "crossOrigin": undefined });
                _this.setSource("https://drive.google.com/uc?id=" + _this.track.fileId + "&export=download");
            }).then(function () {
                _this.play();
                //Event audio ended -> play next track
                if (_this.fnOnEnded == null) {
                    _this.fnOnEnded = _this.onEnded(function () {
                        if (_this.trackIndex < _this.arrTrack.length - 1) {
                            _this.playTrack(_this.trackIndex + 1);
                        }
                        else {
                            if (_this.isLoop()) {
                                if (_this.arrTrack.length > 1) {
                                    _this.playTrack(0);
                                }
                                else {
                                    _this.seek(0);
                                    _this.play();
                                    _this.trackService.upview(track.id);
                                }
                            }
                            else {
                                _this.pause();
                            }
                        }
                    });
                }
            });
            //get album art source
            _this.imageService.getAlbumArt(track.albumArt, 150, 150).then(function (src) {
                _this.track.albumArt = src;
            }).then(function () {
                _this.trackService.upview(track.id);
            });
        }).catch(function (err) {
            console.log("Load track failed");
            throw err;
        });
    };
    AudioPlayer.prototype.getAudioVisualation = function () {
        if (this.elemCanvas == null) {
            this.elemCanvas = document.createElement("canvas");
            this.elemCanvas.setAttribute("width", "800");
            this.elemCanvas.setAttribute("height", "280");
            this.renderAudioVisualation(this.elemCanvas);
        }
        return this.elemCanvas;
    };
    //Audio Visualation
    AudioPlayer.prototype.renderAudioVisualation = function (canvas, width, height) {
        if (width === void 0) { width = 800; }
        if (height === void 0) { height = 250; }
        window["AudioContext"] = window["AudioContext"] || window["webkitAudioContext"] || window["mozAudioContext"];
        var ctx = new window["AudioContext"]();
        var analyser = ctx.createAnalyser();
        var audioSrc = ctx.createMediaElementSource(this.elemAudio);
        // we have to connect the MediaElementSource with the analyser 
        audioSrc.connect(analyser);
        analyser.connect(ctx.destination);
        // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
        // analyser.fftSize = 64;
        // frequencyBinCount tells you how many values you"ll receive from the analyser
        var frequencyData = new Uint8Array(analyser.frequencyBinCount);
        // we"re ready to receive some data!
        var cWidth = canvas["width"], cHeight = canvas["height"] - 2, meterWidth = 10, //width of the meters in the spectrum
        gap = 2, //gap between meters
        capHeight = 2, capStyle = "#fff", meterNum = cWidth / (10 + 2), //count of the meters
        capYPositionArray = []; ////store the vertical position of hte caps for the preivous frame
        ctx = canvas["getContext"]("2d");
        var gradient = ctx.createLinearGradient(0, 0, 0, cHeight);
        gradient.addColorStop(1, "#0f0");
        gradient.addColorStop(0.5, "#ff0");
        gradient.addColorStop(0, "#f00");
        var renderFrame = function () {
            var array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            var step = Math.round(array.length / meterNum); //sample limited data from the total array
            ctx.clearRect(0, 0, cWidth, cHeight);
            for (var i = 0; i < meterNum; i++) {
                var value = array[i * step];
                if (capYPositionArray.length < Math.round(meterNum)) {
                    capYPositionArray.push(value);
                }
                ;
                ctx.fillStyle = capStyle;
                //draw the cap, with transition effect
                if (value < capYPositionArray[i]) {
                    ctx.fillRect(i * 12, cHeight - (--capYPositionArray[i]), meterWidth, capHeight);
                }
                else {
                    ctx.fillRect(i * 12, cHeight - value, meterWidth, capHeight);
                    capYPositionArray[i] = value;
                }
                ;
                ctx.fillStyle = gradient; //set the filllStyle to gradient for a better look
                ctx.fillRect(i * 12 /*meterWidth+gap*/, cHeight - value + capHeight, meterWidth, cHeight); //the meter
            }
            requestAnimationFrame(renderFrame);
        };
        renderFrame();
    };
    AudioPlayer = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__track_service__["a" /* TrackService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__track_service__["a" /* TrackService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__image_service__["a" /* ImageService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__image_service__["a" /* ImageService */]) === 'function' && _b) || Object])
    ], AudioPlayer);
    return AudioPlayer;
    var _a, _b;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/audio-player.service.js.map

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopupService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PopupService = (function () {
    function PopupService() {
        this.reset();
    }
    PopupService.prototype.reset = function () {
        this.title = "Alert";
        this.content = "";
        this.isOn = false;
        this.doSubmit = null;
        this.doCancel = null;
        this.flagBtnCancel = true;
    };
    PopupService.prototype.setTitle = function (title) {
        this.title = title;
    };
    PopupService.prototype.setContent = function (content) {
        this.content = content;
    };
    PopupService.prototype.show = function () {
        this.isOn = true;
    };
    PopupService.prototype.hide = function () {
        this.isOn = false;
        this.reset(); //to prepare for next popup
    };
    PopupService.prototype.onSubmit = function (cb) {
        this.doSubmit = cb;
    };
    ;
    PopupService.prototype.onCancel = function (cb) {
        this.doCancel = cb;
        this.enableCancel();
    };
    ;
    PopupService.prototype.invokeSubmit = function (e) {
        if (this.doSubmit != null) {
            this.doSubmit();
        }
    };
    PopupService.prototype.invokeCancel = function (e) {
        if (this.doCancel != null) {
            this.doCancel();
        }
    };
    PopupService.prototype.isEnableCancel = function () {
        return this.flagBtnCancel;
    };
    PopupService.prototype.enableCancel = function () {
        this.flagBtnCancel = true;
    };
    PopupService.prototype.disableCancel = function () {
        this.flagBtnCancel = false;
    };
    PopupService.prototype.showPopup = function (title, content, onAccepted, onDenied) {
        var _this = this;
        if (onAccepted === void 0) { onAccepted = null; }
        if (onDenied === void 0) { onDenied = null; }
        this.setTitle(title);
        this.setContent(content);
        if (onAccepted != null) {
            this.onSubmit(onAccepted);
        }
        else {
            this.onSubmit(function () { return _this.hide(); });
        }
        if (onDenied != null) {
            this.onCancel(onDenied);
        }
        else {
            this.disableCancel();
        }
        this.show();
    };
    PopupService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], PopupService);
    return PopupService;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/popup.service.js.map

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_model__ = __webpack_require__(254);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Artist; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var Artist = (function (_super) {
    __extends(Artist, _super);
    function Artist() {
        _super.apply(this, arguments);
    }
    return Artist;
}(__WEBPACK_IMPORTED_MODULE_0__entity_model__["a" /* Entity */]));
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/artist.model.js.map

/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_model__ = __webpack_require__(254);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Playlist; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var Playlist = (function (_super) {
    __extends(Playlist, _super);
    function Playlist() {
        _super.apply(this, arguments);
    }
    return Playlist;
}(__WEBPACK_IMPORTED_MODULE_0__entity_model__["a" /* Entity */]));
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/playlist.model.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrackDto; });
var TrackDto = (function () {
    function TrackDto() {
    }
    return TrackDto;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/track.dto.js.map

/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_model__ = __webpack_require__(254);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var User = (function (_super) {
    __extends(User, _super);
    function User() {
        _super.apply(this, arguments);
    }
    return User;
}(__WEBPACK_IMPORTED_MODULE_0__entity_model__["a" /* Entity */]));
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/user.model.js.map

/***/ }),

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_hit_list_model__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__configs_app_config__ = __webpack_require__(24);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GenreService; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var GenreService = (function (_super) {
    __extends(GenreService, _super);
    function GenreService(http, appConfig) {
        _super.call(this, http, appConfig.serviceApiUrl + "/api/v1/genres/");
        this.appConfig = appConfig;
    }
    /**
     * List id name
     */
    GenreService.prototype.listIdName = function () {
        var url = this.apiUrl + "list-id-name";
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return new __WEBPACK_IMPORTED_MODULE_2__models_hit_list_model__["a" /* HitList */](JSON.parse(response["_body"])).hits; })
            .catch(this.handleError);
    };
    GenreService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__configs_app_config__["a" /* AppConfig */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__configs_app_config__["a" /* AppConfig */]) === 'function' && _b) || Object])
    ], GenreService);
    return GenreService;
    var _a, _b;
}(__WEBPACK_IMPORTED_MODULE_3__service__["a" /* Service */]));
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/genre.service.js.map

/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__configs_app_config__ = __webpack_require__(24);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UserService = (function (_super) {
    __extends(UserService, _super);
    function UserService(http, appConfig) {
        _super.call(this, http, appConfig.serverApiUrl + '/api/v1/accounts');
        this.appConfig = appConfig;
    }
    UserService.prototype.authenticate = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        user.app = this.appConfig.appId;
        return this.http
            .post(this.appConfig.authApiUrl, JSON.stringify(user), { "headers": headers })
            .toPromise()
            .then(function (res) { return JSON.parse(res["_body"]); })
            .catch(this.handleError);
    };
    UserService.prototype.rejectToken = function (refreshToken) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        return this.http.post(this.appConfig.authApiUrl + "/token/reject", JSON.stringify({ "refreshToken": refreshToken }))
            .toPromise()
            .then(function (res) { return JSON.parse(res["_body"]); })
            .catch(this.handleError);
    };
    UserService.prototype.refreshToken = function (refreshToken) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        return this.http.post(this.appConfig.authApiUrl + "/token", JSON.stringify({ "refreshToken": refreshToken }))
            .toPromise()
            .then(function (res) { return JSON.parse(res["_body"]); })
            .catch(this.handleError);
    };
    UserService.prototype.changePassword = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        user.app = this.appConfig.appId;
        return this.http
            .post("https://authentication-379.rhcloud.com/api/users/change-password", JSON.stringify(user), { "headers": headers })
            .toPromise()
            .then(function (res) { return JSON.parse(res["_body"]); })
            .catch(this.handleError);
    };
    UserService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__configs_app_config__["a" /* AppConfig */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__configs_app_config__["a" /* AppConfig */]) === 'function' && _b) || Object])
    ], UserService);
    return UserService;
    var _a, _b;
}(__WEBPACK_IMPORTED_MODULE_3__service__["a" /* Service */]));
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/user.service.js.map

/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoreUtil; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var StoreUtil = (function () {
    function StoreUtil() {
        this.cache = new Map();
    }
    StoreUtil = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], StoreUtil);
    return StoreUtil;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/store.util.js.map

/***/ }),

/***/ 445:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_artist_model__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_artist_service__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_popup_service__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditArtistComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EditArtistComponent = (function () {
    function EditArtistComponent(artistService, popupService, router, route) {
        this.artistService = artistService;
        this.popupService = popupService;
        this.router = router;
        this.route = route;
    }
    EditArtistComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.artist = new __WEBPACK_IMPORTED_MODULE_2__models_artist_model__["a" /* Artist */]();
        this.sub = this.route.params.subscribe(function (params) {
            var id = params["id"];
            _this.artistService.getOne(id).then(function (artist) {
                _this.artist = artist;
            }).catch(function (err) {
                _this.popupService.showPopup("Load Artist", "Can not load artist info");
            });
        });
    };
    EditArtistComponent.prototype.saveArtist = function () {
        var _this = this;
        this.artistService.save(this.artist).then(function (data) {
            _this.popupService.showPopup("Save Artist", "Save artist success");
        }).catch(function (err) {
            _this.popupService.showPopup("Save Artist", "Save artist fail");
        });
    };
    EditArtistComponent.prototype.goBack = function () {
        this.router.navigate(['/artists']);
    };
    EditArtistComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'new-artist',
            template: "\n    <h3>Edit Artist</h3>\n<artist-form [artist]=\"artist\" (doSubmit)=\"saveArtist($event)\" (doCancel)=\"goBack($event)\"></artist-form>\n\n"
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_artist_service__["a" /* ArtistService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_artist_service__["a" /* ArtistService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__services_popup_service__["a" /* PopupService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services_popup_service__["a" /* PopupService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === 'function' && _d) || Object])
    ], EditArtistComponent);
    return EditArtistComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/edit-artist.component.js.map

/***/ }),

/***/ 446:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_pagination_model__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_artist_service__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__configs_app_config__ = __webpack_require__(24);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageArtistComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// ====ManageArtist====
var ManageArtistComponent = (function () {
    function ManageArtistComponent(artistService, appConfig) {
        this.artistService = artistService;
        this.appConfig = appConfig;
        this.artists = [];
    }
    ManageArtistComponent.prototype.ngOnInit = function () {
        this.pagination = new __WEBPACK_IMPORTED_MODULE_1__models_pagination_model__["a" /* Pagination */]();
        this.pagination.pageSize = 20;
        this.pagination.currentPage = -1;
        this.pagination.maxNumOfPages = 7;
        this.pagination.endPage = this.pagination.maxNumOfPages - 1;
        this.loadPage(0);
    };
    ManageArtistComponent.prototype.loadPage = function (page, forceLoad) {
        var _this = this;
        if (forceLoad === void 0) { forceLoad = false; }
        if (forceLoad === true || this.pagination.currentPage !== page) {
            this.artistService.query(page, this.pagination.pageSize).then(function (hitList) {
                _this.artists = hitList.hits;
                _this.pagination.numOfPages = Math.floor(hitList.total / _this.pagination.pageSize) + 1;
                if (_this.pagination.numOfPages < _this.pagination.maxNumOfPages) {
                    _this.pagination.endPage = _this.pagination.numOfPages - 1;
                }
                _this.pagination.currentPage = page;
            }).catch(function (err) { return console.log("Load artists failed", err); });
        }
    };
    ManageArtistComponent.prototype.detectPrePagination = function () {
        var p = this.pagination.detectPrePagination();
        if (p !== this.pagination) {
            this.pagination = p;
            this.loadPage(this.pagination.currentPage, true);
        }
    };
    ManageArtistComponent.prototype.detectNextPagination = function () {
        var p = this.pagination.detectNextPagination();
        if (p !== this.pagination) {
            this.pagination = p;
            this.loadPage(this.pagination.currentPage, true);
        }
    };
    ManageArtistComponent.prototype.deleteArtist = function (artist) {
        // TODO
        console.log("Delete artist", artist);
    };
    ManageArtistComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "manage-artist",
            template: "\n    <h3>Artists</h3>\n    <p [permission]=\"appConfig.permissions.CREATE_ARTIST\"><a routerLink=\"/artists/new\">New Artist</a></p>\n<pagination [pagination]=\"pagination\" (onSelectPage)=\"loadPage($event)\" (onPrePagination)=\"detectPrePagination($event)\" (onNextPagination)=\"detectNextPagination($event)\"></pagination>\n<list-artist [artists]=\"artists\" (onDeleteItem)=\"deleteArtist($event)\"></list-artist>\n<pagination [pagination]=\"pagination\" (onSelectPage)=\"loadPage($event)\" (onPrePagination)=\"detectPrePagination($event)\" (onNextPagination)=\"detectNextPagination($event)\"></pagination>\n"
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_artist_service__["a" /* ArtistService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_artist_service__["a" /* ArtistService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__configs_app_config__["a" /* AppConfig */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__configs_app_config__["a" /* AppConfig */]) === 'function' && _b) || Object])
    ], ManageArtistComponent);
    return ManageArtistComponent;
    var _a, _b;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/manage-artist.component.js.map

/***/ }),

/***/ 447:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_artist_model__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_artist_service__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_popup_service__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewArtistComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NewArtistComponent = (function () {
    function NewArtistComponent(artistService, popupService, router) {
        this.artistService = artistService;
        this.popupService = popupService;
        this.router = router;
    }
    NewArtistComponent.prototype.ngOnInit = function () {
        this.artist = new __WEBPACK_IMPORTED_MODULE_2__models_artist_model__["a" /* Artist */]();
    };
    NewArtistComponent.prototype.saveArtist = function () {
        var _this = this;
        this.artistService.save(this.artist).then(function (data) {
            _this.popupService.showPopup("Save Artist", "Save artist success");
        }).catch(function (err) {
            _this.popupService.showPopup("Save Artist", "Save artist fail");
        });
    };
    NewArtistComponent.prototype.goBack = function () {
        this.router.navigate(['/artists']);
    };
    NewArtistComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'new-artist',
            template: "\n    <h3>New Artist</h3>\n<artist-form [artist]=\"artist\" (doSubmit)=\"saveArtist($event)\" (doCancel)=\"goBack($event)\"></artist-form>\n"
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_artist_service__["a" /* ArtistService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_artist_service__["a" /* ArtistService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__services_popup_service__["a" /* PopupService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services_popup_service__["a" /* PopupService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _c) || Object])
    ], NewArtistComponent);
    return NewArtistComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/new-artist.component.js.map

/***/ }),

/***/ 448:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_pagination_model__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_track_service__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_image_service__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_popup_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_store_util__ = __webpack_require__(372);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashBoardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DashBoardComponent = (function () {
    function DashBoardComponent(trackService, popupService, imageService, storeUtil) {
        this.trackService = trackService;
        this.popupService = popupService;
        this.imageService = imageService;
        this.storeUtil = storeUtil;
        this.tracks = [];
    }
    DashBoardComponent.prototype.ngOnInit = function () {
        this.term = this.storeUtil.cache.get('dashboard:term');
        var page = this.storeUtil.cache.get('dashboard:page');
        this.page = page ? +page : 0;
        this.pagination = new __WEBPACK_IMPORTED_MODULE_1__models_pagination_model__["a" /* Pagination */]();
        this.pagination.pageSize = 12;
        this.pagination.currentPage = -1;
        this.pagination.maxNumOfPages = 7;
        this.pagination.endPage = this.pagination.maxNumOfPages - 1;
        this.loadPage(this.page);
    };
    DashBoardComponent.prototype.loadPage = function (page, forceLoad) {
        var _this = this;
        if (forceLoad === void 0) { forceLoad = false; }
        if (this.isPending) {
            return;
        }
        this.isPending = true;
        if (forceLoad === true || this.pagination.currentPage !== page) {
            this.trackService.query(page, this.pagination.pageSize, this.term).then(function (hitList) {
                _this.page = page;
                _this.totalTracks = hitList.total;
                _this.tracks = hitList.hits;
                _this.pagination.numOfPages = Math.floor(hitList.total / _this.pagination.pageSize) + 1;
                if (_this.pagination.numOfPages < _this.pagination.maxNumOfPages) {
                    _this.pagination.endPage = _this.pagination.numOfPages - 1;
                }
                _this.pagination.currentPage = page;
                _this.tracks.forEach(function (item, i) {
                    _this.imageService.getAlbumArt(item.albumArt, 150, 150).then(function (src) {
                        item.albumArtUrl = src;
                    });
                });
            }).catch(function (err) { return console.log("Load tracks failed", err); }).then(function () { return _this.isPending = false; });
        }
    };
    DashBoardComponent.prototype.detectPrePagination = function () {
        var p = this.pagination.detectPrePagination();
        if (p !== this.pagination) {
            this.pagination = p;
            this.loadPage(this.pagination.currentPage, true);
        }
    };
    DashBoardComponent.prototype.detectNextPagination = function () {
        var p = this.pagination.detectNextPagination();
        if (p !== this.pagination) {
            this.pagination = p;
            this.loadPage(this.pagination.currentPage, true);
        }
    };
    DashBoardComponent.prototype.searchTrack = function () {
        if (this.term == '') {
            this.term = null;
            this.loadPage(0, true);
        }
        else if (this.term.trim() != '') {
            this.loadPage(0, true);
        }
    };
    DashBoardComponent.prototype.enterSearch = function (keyCode) {
        if (keyCode == 13) {
            this.searchTrack();
        }
    };
    DashBoardComponent.prototype.ngOnDestroy = function () {
        this.storeUtil.cache.set('dashboard:term', this.term);
        this.storeUtil.cache.set('dashboard:page', '' + this.page);
    };
    DashBoardComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "dashboard",
            template: "\n<h3>Tracks ({{totalTracks}})</h3>\n<div class=\"col-sm-offset-2 col-sm-10\">\n<div class=\"input-group\">\n<input type=\"text\" class=\"form-control\" [(ngModel)]=\"term\" name=\"term\" placeholder=\"Search\" (keypress)=\"enterSearch($event.keyCode)\" />\n    <div class=\"input-group-btn\">\n<button class=\"btn btn-success\" (click)=\"searchTrack()\">Search</button>\n</div>\n</div>\n</div>\n<pagination [pagination]=\"pagination\" (onSelectPage)=\"loadPage($event)\" (onPrePagination)=\"detectPrePagination($event)\" (onNextPagination)=\"detectNextPagination($event)\"></pagination>\n<hits-track [tracks]=\"tracks\"></hits-track>\n<pagination [pagination]=\"pagination\" (onSelectPage)=\"loadPage($event)\" (onPrePagination)=\"detectPrePagination($event)\" (onNextPagination)=\"detectNextPagination($event)\"></pagination>\n\n    ",
            styleUrls: [] }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_track_service__["a" /* TrackService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_track_service__["a" /* TrackService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__services_popup_service__["a" /* PopupService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services_popup_service__["a" /* PopupService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_image_service__["a" /* ImageService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_image_service__["a" /* ImageService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__utils_store_util__["a" /* StoreUtil */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__utils_store_util__["a" /* StoreUtil */]) === 'function' && _d) || Object])
    ], DashBoardComponent);
    return DashBoardComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/dash-board.component.js.map

/***/ }),

/***/ 449:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_playlist_model__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_playlist_service__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_popup_service__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditPlaylistComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EditPlaylistComponent = (function () {
    function EditPlaylistComponent(playlistService, popupService, router, route) {
        this.playlistService = playlistService;
        this.popupService = popupService;
        this.router = router;
        this.route = route;
    }
    EditPlaylistComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.playlist = new __WEBPACK_IMPORTED_MODULE_2__models_playlist_model__["a" /* Playlist */]();
        this.sub = this.route.params.subscribe(function (params) {
            var id = params["id"];
            _this.playlistService.getOne(id).then(function (playlist) {
                _this.playlist = playlist;
            }).catch(function (err) {
                _this.popupService.showPopup("Load Playlist", "Can not load playlist info");
            });
        });
    };
    EditPlaylistComponent.prototype.savePlaylist = function () {
        var _this = this;
        var playlistDto = new __WEBPACK_IMPORTED_MODULE_2__models_playlist_model__["a" /* Playlist */]();
        playlistDto.id = this.playlist.id;
        playlistDto.name = this.playlist.name;
        playlistDto.trackIds = this.playlist.trackIds;
        this.playlistService.save(playlistDto).then(function (data) {
            console.log(_this.playlist);
            _this.popupService.showPopup("Save Playlist", "Save playlist success");
            _this.goBack();
        }).catch(function (err) {
            _this.popupService.showPopup("Save Playlist", "Save playlist fail");
        });
    };
    EditPlaylistComponent.prototype.goBack = function () {
        this.router.navigate(['/playlists']);
    };
    EditPlaylistComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'edit-playlist',
            template: "\n    <h3>Edit Playlist</h3>\n<playlist-form [playlist]=\"playlist\" (doSubmit)=\"savePlaylist($event)\" (doCancel)=\"goBack($event)\"></playlist-form>\n"
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_playlist_service__["a" /* PlaylistService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_playlist_service__["a" /* PlaylistService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__services_popup_service__["a" /* PopupService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services_popup_service__["a" /* PopupService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === 'function' && _d) || Object])
    ], EditPlaylistComponent);
    return EditPlaylistComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/edit-playlist.component.js.map

/***/ }),

/***/ 450:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_pagination_model__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_playlist_service__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__configs_app_config__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_popup_service__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManagePlaylistComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ManagePlaylistComponent = (function () {
    function ManagePlaylistComponent(playlistService, popupService, appConfig) {
        this.playlistService = playlistService;
        this.popupService = popupService;
        this.appConfig = appConfig;
        this.playlists = [];
    }
    ManagePlaylistComponent.prototype.ngOnInit = function () {
        this.pagination = new __WEBPACK_IMPORTED_MODULE_1__models_pagination_model__["a" /* Pagination */]();
        this.pagination.pageSize = 20;
        this.pagination.currentPage = -1;
        this.pagination.maxNumOfPages = 7;
        this.pagination.endPage = this.pagination.maxNumOfPages - 1;
        this.loadPage(0);
    };
    ManagePlaylistComponent.prototype.loadPage = function (page, forceLoad) {
        var _this = this;
        if (forceLoad === void 0) { forceLoad = false; }
        if (forceLoad === true || this.pagination.currentPage !== page) {
            this.playlistService.query(page, this.pagination.pageSize).then(function (hitList) {
                _this.playlists = hitList.hits;
                _this.pagination.numOfPages = Math.floor(hitList.total / _this.pagination.pageSize) + 1;
                if (_this.pagination.numOfPages < _this.pagination.maxNumOfPages) {
                    _this.pagination.endPage = _this.pagination.numOfPages - 1;
                }
                _this.pagination.currentPage = page;
            }).catch(function (err) { return console.log("Load playlists failed", err); });
        }
    };
    ManagePlaylistComponent.prototype.detectPrePagination = function () {
        var p = this.pagination.detectPrePagination();
        if (p !== this.pagination) {
            this.pagination = p;
            this.loadPage(this.pagination.currentPage, true);
        }
    };
    ManagePlaylistComponent.prototype.detectNextPagination = function () {
        var p = this.pagination.detectNextPagination();
        if (p !== this.pagination) {
            this.pagination = p;
            this.loadPage(this.pagination.currentPage, true);
        }
    };
    ManagePlaylistComponent.prototype.deletePlaylist = function (playlist) {
        // TODO
        this.popupService.showPopup("Delete Playlist", "Can not delete because the function is not ready");
        console.log("Delete playlist", playlist);
    };
    ManagePlaylistComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "manage-playlist",
            template: "\n    <h3>Playlists</h3>\n    <p [permission]=\"appConfig.permissions.CREATE_PLAYLIST\"><a routerLink=\"/playlists/new\">New Playlist</a></p>\n<pagination [pagination]=\"pagination\" (onSelectPage)=\"loadPage($event)\" (onPrePagination)=\"detectPrePagination($event)\" (onNextPagination)=\"detectNextPagination($event)\"></pagination>\n<list-playlist [playlists]=\"playlists\" (onDeleteItem)=\"deletePlaylist($event)\"></list-playlist>\n<pagination [pagination]=\"pagination\" (onSelectPage)=\"loadPage($event)\" (onPrePagination)=\"detectPrePagination($event)\" (onNextPagination)=\"detectNextPagination($event)\"></pagination>\n"
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_playlist_service__["a" /* PlaylistService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_playlist_service__["a" /* PlaylistService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__services_popup_service__["a" /* PopupService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services_popup_service__["a" /* PopupService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__configs_app_config__["a" /* AppConfig */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__configs_app_config__["a" /* AppConfig */]) === 'function' && _c) || Object])
    ], ManagePlaylistComponent);
    return ManagePlaylistComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/manage-playlist.component.js.map

/***/ }),

/***/ 451:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_playlist_model__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_playlist_service__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_popup_service__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewPlaylistComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NewPlaylistComponent = (function () {
    function NewPlaylistComponent(playlistService, popupService, router) {
        this.playlistService = playlistService;
        this.popupService = popupService;
        this.router = router;
    }
    NewPlaylistComponent.prototype.ngOnInit = function () {
        this.playlist = new __WEBPACK_IMPORTED_MODULE_2__models_playlist_model__["a" /* Playlist */]();
    };
    NewPlaylistComponent.prototype.savePlaylist = function () {
        var _this = this;
        this.playlistService.save(this.playlist).then(function (data) {
            _this.popupService.showPopup("Save Playlist", "Save playlist success");
        }).catch(function (err) {
            _this.popupService.showPopup("Save Playlist", "Save playlist fail");
        });
    };
    NewPlaylistComponent.prototype.goBack = function () {
        this.router.navigate(['/playlists']);
    };
    NewPlaylistComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'new-playlist',
            template: "\n    <h3>New Playlist</h3>\n<playlist-form [playlist]=\"playlist\" (doSubmit)=\"savePlaylist($event)\" (doCancel)=\"goBack($event)\"></playlist-form>\n"
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_playlist_service__["a" /* PlaylistService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_playlist_service__["a" /* PlaylistService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__services_popup_service__["a" /* PopupService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services_popup_service__["a" /* PopupService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _c) || Object])
    ], NewPlaylistComponent);
    return NewPlaylistComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/new-playlist.component.js.map

/***/ }),

/***/ 452:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_track_service__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_playlist_service__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_image_service__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_audio_player_service__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_string_util__ = __webpack_require__(131);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayPlaylistComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var PlayPlaylistComponent = (function () {
    function PlayPlaylistComponent(route, router, playlistService, trackService, audioPlayer, stringUtil, el, renderer, imageService) {
        this.route = route;
        this.router = router;
        this.playlistService = playlistService;
        this.trackService = trackService;
        this.audioPlayer = audioPlayer;
        this.stringUtil = stringUtil;
        this.el = el;
        this.renderer = renderer;
        this.imageService = imageService;
        this.fnOnTimeUpdate = null;
        this.fnOnPlay = null;
        this.fnOnPause = null;
        this.fnOnEnded = null;
    }
    PlayPlaylistComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.audioPlayer.shouldShowPersistent = false;
        this.sub = this.route.params.subscribe(function (params) {
            var id = params["id"];
            if (_this.audioPlayer.playlistId == id) {
                _this.viewBtnPlay.nativeElement.classList.remove('btn-play');
                _this.viewBtnPlay.nativeElement.classList.add('btn-pause');
                _this.viewMyCanvas.nativeElement.appendChild(_this.audioPlayer.getAudioVisualation());
                _this.registerEvents();
            }
            else
                _this.playlistService.getOne(id).then(function (playlist) {
                    _this.audioPlayer.playlistId = playlist.id;
                    _this.audioPlayer.returnPath = "/playlists/" + playlist.nameUnsign + "/" + playlist.id;
                    if (playlist.tracks.length > 0) {
                        _this.audioPlayer.arrTrack = playlist.tracks;
                        _this.playTrack(0);
                    }
                    _this.playlistService.upview(playlist.id);
                }).catch(function (err) { return console.log("Play playlist failed", err); });
        });
        //Play/Pause
        this.renderer.listen(this.viewBtnPlay.nativeElement, "click", function (event) {
            if (_this.audioPlayer.isPlaying()) {
                _this.viewBtnPlay.nativeElement.classList.remove('btn-pause');
                _this.viewBtnPlay.nativeElement.classList.add('btn-play');
                _this.audioPlayer.pause();
            }
            else {
                _this.viewBtnPlay.nativeElement.classList.remove('btn-play');
                _this.viewBtnPlay.nativeElement.classList.add('btn-pause');
                _this.audioPlayer.play();
            }
        });
        //Loop or not
        this.renderer.listen(this.viewBtnLoop.nativeElement, "click", function (event) {
            if (_this.audioPlayer.isLoop()) {
                _this.audioPlayer.setLoop(false);
                _this.viewBtnLoop.nativeElement.classList.add('disabled');
            }
            else {
                _this.audioPlayer.setLoop(true);
                _this.viewBtnLoop.nativeElement.classList.remove('disabled');
            }
        });
        //Volume
        this.renderer.listen(this.viewBtnVolume.nativeElement, "click", function (event) {
            if (_this.viewVolumeSlider.nativeElement.classList.contains('hidden')) {
                _this.viewVolumeSlider.nativeElement.classList.remove('hidden');
            }
            else {
                _this.viewVolumeSlider.nativeElement.classList.add('hidden');
            }
        });
        this.renderer.listen(this.viewVolumeSliderBar.nativeElement, "change", function (event) {
            var volume = _this.viewVolumeSliderBar.nativeElement.value;
            _this.audioPlayer.setVolume(volume);
            if (volume == 0) {
                _this.viewBtnVolume.nativeElement.classList.add('muted');
            }
            else {
                _this.viewBtnVolume.nativeElement.classList.remove('muted');
            }
        });
        //Audio seek
        this.renderer.listen(this.viewProgressBar.nativeElement, "click", function (event) {
            var progress = event.offsetX / _this.viewProgressBar.nativeElement.offsetWidth;
            var duration = _this.audioPlayer.getDuration();
            var currentTime = progress * duration;
            _this.audioPlayer.seek(currentTime);
        });
        //Fast forward
        this.renderer.listen(this.viewBtnFastForward.nativeElement, "click", function (event) {
            var duration = _this.audioPlayer.getDuration();
            var currentTime = _this.audioPlayer.getCurrentTime() + 0.02 * duration;
            _this.audioPlayer.seek(currentTime);
        });
        //Rewind
        this.renderer.listen(this.viewBtnRewind.nativeElement, "click", function (event) {
            var duration = _this.audioPlayer.getDuration();
            var currentTime = _this.audioPlayer.getCurrentTime() - 0.02 * duration;
            _this.audioPlayer.seek(currentTime);
        });
    };
    PlayPlaylistComponent.prototype.playTrack = function (index) {
        var _this = this;
        this.audioPlayer.playTrack(index).then(function () {
            _this.viewBtnPlay.nativeElement.classList.remove('btn-play');
            _this.viewBtnPlay.nativeElement.classList.add('btn-pause');
            _this.viewMyCanvas.nativeElement.appendChild(_this.audioPlayer.getAudioVisualation());
            _this.registerEvents();
        });
    };
    PlayPlaylistComponent.prototype.registerEvents = function () {
        var _this = this;
        //Show progress
        if (this.fnOnTimeUpdate == null) {
            this.fnOnTimeUpdate = this.audioPlayer.onTimeUpdate(function () {
                var currentTime = _this.audioPlayer.getCurrentTime();
                var duration = _this.audioPlayer.getDuration();
                var progress = Math.floor(currentTime * 10000 / duration) / 100;
                if (progress < 98) {
                    _this.viewProgress.nativeElement.style.width = progress + "%";
                }
                _this.viewTimeSpan.nativeElement.innerHTML = _this.stringUtil.convertTime(Math.floor(currentTime));
                _this.viewTimeRemain.nativeElement.innerHTML = _this.stringUtil.convertTime(Math.floor(duration - currentTime));
            });
        }
        //Audio ended
        if (this.fnOnEnded == null) {
            this.fnOnEnded = this.audioPlayer.onEnded(function () {
                _this.viewBtnPlay.nativeElement.classList.remove('btn-pause');
                _this.viewBtnPlay.nativeElement.classList.add('btn-play');
            });
        }
        if (this.fnOnPause == null) {
            this.fnOnPause = this.audioPlayer.onPause(function () {
                _this.viewBtnPlay.nativeElement.classList.remove('btn-pause');
                _this.viewBtnPlay.nativeElement.classList.add('btn-play');
            });
        }
        if (this.fnOnPlay == null) {
            this.fnOnPlay = this.audioPlayer.onPlay(function () {
                _this.viewBtnPlay.nativeElement.classList.remove('btn-play');
                _this.viewBtnPlay.nativeElement.classList.add('btn-pause');
            });
        }
    };
    PlayPlaylistComponent.prototype.ngOnDestroy = function () {
        this.audioPlayer.shouldShowPersistent = true;
        if (this.audioPlayer.isPlaying()) {
            this.audioPlayer.shouldShowPersistent = true;
        }
        else {
            this.audioPlayer.shouldShowPersistent = false;
        }
        this.sub.unsubscribe();
        if (this.fnOnTimeUpdate !== null) {
            this.audioPlayer.removeOnTimeUpdate(this.fnOnTimeUpdate);
        }
        if (this.fnOnEnded !== null) {
            this.audioPlayer.removeOnEnded(this.fnOnEnded);
        }
        if (this.fnOnPause !== null) {
            this.audioPlayer.removeOnEnded(this.fnOnPause);
        }
        if (this.fnOnPlay !== null) {
            this.audioPlayer.removeOnEnded(this.fnOnPlay);
        }
    };
    PlayPlaylistComponent.prototype.isTrackPlaying = function (index) {
        return this.audioPlayer.trackIndex == index;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("audioPlayer"), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _a) || Object)
    ], PlayPlaylistComponent.prototype, "viewAudioPlayer", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("myCanvas"), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _b) || Object)
    ], PlayPlaylistComponent.prototype, "viewMyCanvas", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("progressBar"), 
        __metadata('design:type', (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _c) || Object)
    ], PlayPlaylistComponent.prototype, "viewProgressBar", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("progress"), 
        __metadata('design:type', (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _d) || Object)
    ], PlayPlaylistComponent.prototype, "viewProgress", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("timeSpan"), 
        __metadata('design:type', (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _e) || Object)
    ], PlayPlaylistComponent.prototype, "viewTimeSpan", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("timeRemain"), 
        __metadata('design:type', (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _f) || Object)
    ], PlayPlaylistComponent.prototype, "viewTimeRemain", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("btnPlay"), 
        __metadata('design:type', (typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _g) || Object)
    ], PlayPlaylistComponent.prototype, "viewBtnPlay", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("btnLoop"), 
        __metadata('design:type', (typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _h) || Object)
    ], PlayPlaylistComponent.prototype, "viewBtnLoop", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("btnFastForward"), 
        __metadata('design:type', (typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _j) || Object)
    ], PlayPlaylistComponent.prototype, "viewBtnFastForward", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("btnRewind"), 
        __metadata('design:type', (typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _k) || Object)
    ], PlayPlaylistComponent.prototype, "viewBtnRewind", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("btnVolume"), 
        __metadata('design:type', (typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _l) || Object)
    ], PlayPlaylistComponent.prototype, "viewBtnVolume", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("volumeSlider"), 
        __metadata('design:type', (typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _m) || Object)
    ], PlayPlaylistComponent.prototype, "viewVolumeSlider", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("volumeSliderBar"), 
        __metadata('design:type', (typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _o) || Object)
    ], PlayPlaylistComponent.prototype, "viewVolumeSliderBar", void 0);
    PlayPlaylistComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "play-playlist",
            template: "\n<div class=\"col-sm-9\">\n    <div #myCanvas class=\"audio-visualation\"></div>\n    <div #audioPayer class=\"audio-player\">\n<img [ngClass]=\"{'album-art-circle album-art': true, 'rotate-z': audioPlayer.isPlaying()}\" [src]=\"audioPlayer.track.albumArt ? audioPlayer.track.albumArt : ''\"/>\n        <div class=\"track-info\">\n            <div class=\"track-name\">{{audioPlayer.track.name}}</div>\n            <div class=\"track-artist\">{{audioPlayer.track.artist}}</div>\n        </div>\n        <div #progressBar class=\"play-progress-bar\">\n        <div #progress class=\"play-progress\">\n            <div class=\"pointer\"></div>\n        </div>\n        </div>\n        <div class=\"time-duration\">\n            <div #timeSpan class=\"time-span\"></div>\n            <div #timeRemain class=\"time-remain\"></div>\n        </div>\n        <div #btnLoop class=\"btn-loop\"></div>\n        <div #btnPlay class=\"btn-play\"></div>\n        <div #btnFastForward class=\"btn-fast-forward\"></div>\n        <div #btnRewind class=\"btn-rewind\"></div>\n        <div #btnVolume class=\"btn-volume\"></div>\n        <div #volumeSlider class=\"volume-slider hidden\">\n            <input #volumeSliderBar type=\"range\" min=\"0\" max=\"1.0\" value=\"{{this.audioPlayer.getVolume()}}\" step=\"0.05\" />\n        </div>\n    </div>\n    <div class=\"playlist\">\n        <ul class=\"list-group\">\n<li *ngFor=\"let item of audioPlayer.arrTrack; let i = index\" [ngClass]=\"{'highlight': isTrackPlaying(i), 'list-group-item': true}\" data-toggle=\"tooltip\" title=\"{{item.name + '<br/>' + item.artist}}\" (click)=\"playTrack(i)\">\n                <span class=\"track-title\">{{i + 1}}. {{item.name }}</span>\n                <br/> <span class=\"track-artist\"> {{item.artist}}</span>\n    <span class=\"badge\">{{stringUtil.convertTime(item.length)}}</span>\n            </li>\n        </ul>\n    </div>\n</div>\n"
        }), 
        __metadata('design:paramtypes', [(typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === 'function' && _p) || Object, (typeof (_q = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _q) || Object, (typeof (_r = typeof __WEBPACK_IMPORTED_MODULE_3__services_playlist_service__["a" /* PlaylistService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_playlist_service__["a" /* PlaylistService */]) === 'function' && _r) || Object, (typeof (_s = typeof __WEBPACK_IMPORTED_MODULE_2__services_track_service__["a" /* TrackService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_track_service__["a" /* TrackService */]) === 'function' && _s) || Object, (typeof (_t = typeof __WEBPACK_IMPORTED_MODULE_5__services_audio_player_service__["a" /* AudioPlayer */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__services_audio_player_service__["a" /* AudioPlayer */]) === 'function' && _t) || Object, (typeof (_u = typeof __WEBPACK_IMPORTED_MODULE_6__utils_string_util__["a" /* StringUtil */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_6__utils_string_util__["a" /* StringUtil */]) === 'function' && _u) || Object, (typeof (_v = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _v) || Object, (typeof (_w = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]) === 'function' && _w) || Object, (typeof (_x = typeof __WEBPACK_IMPORTED_MODULE_4__services_image_service__["a" /* ImageService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services_image_service__["a" /* ImageService */]) === 'function' && _x) || Object])
    ], PlayPlaylistComponent);
    return PlayPlaylistComponent;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/play-playlist.component.js.map

/***/ }),

/***/ 453:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_track_service__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_popup_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_track_dto__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_artist_service__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_genre_service__ = __webpack_require__(370);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditTrackComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var EditTrackComponent = (function () {
    function EditTrackComponent(trackService, artistService, genreService, popupService, route, router) {
        this.trackService = trackService;
        this.artistService = artistService;
        this.genreService = genreService;
        this.popupService = popupService;
        this.route = route;
        this.router = router;
    }
    EditTrackComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.track = new __WEBPACK_IMPORTED_MODULE_4__models_track_dto__["a" /* TrackDto */]();
        this.sub = this.route.params.subscribe(function (params) {
            var id = params["id"];
            _this.trackService.getOne(id).then(function (track) {
                _this.track.id = track.id;
                _this.track.name = track.name;
                //this.track.genreId = track.genreId;
                //this.track.artistIds = [];
            }).catch(function (err) { return _this.popupService.showPopup("Get Track", "Can not get track"); });
        });
        this.artistService.listIdName().then(function (artists) { return _this.allArtists = artists; }).catch(function (err) { return console.log('Get artists fail', err); });
        this.genreService.listIdName().then(function (genres) { return _this.allGenres = genres; }).catch(function (err) { return console.log('Get genres fail', err); });
    };
    EditTrackComponent.prototype.saveTrack = function () {
        var _this = this;
        this.trackService.update(this.track).then(function (data) {
            _this.popupService.showPopup("Save Track", "Save track success");
        }).catch(function (err) {
            _this.popupService.showPopup("Save Track", "Save track fail");
        });
    };
    EditTrackComponent.prototype.goBack = function () {
        this.router.navigate(['/tracks']);
    };
    EditTrackComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    EditTrackComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'edit-track',
            template: "\n<h3>Edit Track</h3>\n<track-form [track]=\"track\" [artists]=\"allArtists\" [genres]=\"allGenres\" (doSubmit)=\"saveTrack($event)\" (doCancel)=\"goBack($event)\"></track-form>\n\n"
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_track_service__["a" /* TrackService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_track_service__["a" /* TrackService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__services_artist_service__["a" /* ArtistService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__services_artist_service__["a" /* ArtistService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__services_genre_service__["a" /* GenreService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_6__services_genre_service__["a" /* GenreService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_popup_service__["a" /* PopupService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_popup_service__["a" /* PopupService */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _f) || Object])
    ], EditTrackComponent);
    return EditTrackComponent;
    var _a, _b, _c, _d, _e, _f;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/edit-track.component.js.map

/***/ }),

/***/ 454:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_pagination_model__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_track_service__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_track_playlists_dto__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_playlist_service__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_image_service__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__configs_app_config__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_popup_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__utils_store_util__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__models_track_dto__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_artist_service__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_genre_service__ = __webpack_require__(370);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageTrackComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NewTrackComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










// ====ManageTrack====
var ManageTrackComponent = (function () {
    function ManageTrackComponent(trackService, popupService, playlistService, appConfig, imageService, storeUtil) {
        this.trackService = trackService;
        this.popupService = popupService;
        this.playlistService = playlistService;
        this.appConfig = appConfig;
        this.imageService = imageService;
        this.storeUtil = storeUtil;
        this.tracks = [];
        this.trackPlaylistsDto = new __WEBPACK_IMPORTED_MODULE_4__models_track_playlists_dto__["a" /* TrackPlaylistsDto */]();
        this.myPlaylists = [];
    }
    ManageTrackComponent.prototype.ngOnInit = function () {
        this.term = this.storeUtil.cache.get('track:term');
        this.orderby = this.storeUtil.cache.get('track:orderby') || "id";
        this.direction = this.storeUtil.cache.get('track:direction') || "asc";
        var page = this.storeUtil.cache.get('track:page');
        this.page = page ? +page : 0;
        this.pagination = new __WEBPACK_IMPORTED_MODULE_2__models_pagination_model__["a" /* Pagination */]();
        this.pagination.pageSize = 20;
        this.pagination.currentPage = -1;
        this.pagination.maxNumOfPages = 7;
        this.pagination.endPage = this.pagination.maxNumOfPages - 1;
        this.loadPage(this.page);
    };
    ManageTrackComponent.prototype.loadPage = function (page, forceLoad) {
        var _this = this;
        if (forceLoad === void 0) { forceLoad = false; }
        if (this.isPending) {
            return;
        }
        this.isPending = true;
        if (forceLoad === true || this.pagination.currentPage !== page) {
            this.trackService.query(page, this.pagination.pageSize, this.term, this.orderby + ":" + this.direction).then(function (hitList) {
                _this.page = page;
                _this.totalTracks = hitList.total;
                _this.tracks = hitList.hits;
                _this.pagination.numOfPages = Math.floor(hitList.total / _this.pagination.pageSize) + 1;
                if (_this.pagination.numOfPages < _this.pagination.maxNumOfPages) {
                    _this.pagination.endPage = _this.pagination.numOfPages - 1;
                }
                _this.pagination.currentPage = page;
                _this.tracks.forEach(function (item, i) {
                    _this.imageService.getAlbumArt(item.albumArt, 120, 120).then(function (src) {
                        item.albumArtUrl = src;
                    });
                });
            }).catch(function (err) { return console.log("Load tracks failed", err); }).then(function () { return _this.isPending = false; });
        }
    };
    ManageTrackComponent.prototype.detectPrePagination = function () {
        var p = this.pagination.detectPrePagination();
        if (p !== this.pagination) {
            this.pagination = p;
            this.loadPage(this.pagination.currentPage, true);
        }
    };
    ManageTrackComponent.prototype.detectNextPagination = function () {
        var p = this.pagination.detectNextPagination();
        if (p !== this.pagination) {
            this.pagination = p;
            this.loadPage(this.pagination.currentPage, true);
        }
    };
    ManageTrackComponent.prototype.deleteTrack = function (track) {
        var _this = this;
        this.popupService.showPopup("Delete Track", "Are you sure you would like to delete \"" + track.name + "\"?", function () {
            _this.popupService.showPopup("Confirm Delete Track", "Are you sure ?", function () {
                _this.popupService.showPopup("Confirm Delete Track", "Really ?", function () {
                    //TODO Delete on server
                    var i = _this.tracks.indexOf(track);
                    _this.tracks.splice(i, 1);
                    _this.totalTracks -= 1;
                    _this.popupService.showPopup("Delete Track", "Delete success");
                }, function () { _this.popupService.hide(); });
            }, function () { _this.popupService.hide(); });
        }, function () { _this.popupService.hide(); });
    };
    ManageTrackComponent.prototype.searchTrack = function () {
        if (this.term != null && this.term.trim() != '') {
            this.loadPage(0, true);
        }
    };
    ManageTrackComponent.prototype.enterSearch = function (keyCode) {
        if (keyCode == 13) {
            this.searchTrack();
        }
    };
    ManageTrackComponent.prototype.onChange = function () {
        var _this = this;
        //wait for binding
        window.setTimeout(function () { return _this.loadPage(0, true); }, 100);
    };
    ManageTrackComponent.prototype.addToPlaylist = function (track) {
        var _this = this;
        this.trackPlaylistsDto.trackId = '' + track.id;
        this.trackPlaylistsDto.name = track.name;
        this.trackPlaylistsDto.artist = track.artist;
        this.trackPlaylistsDto.playlistIds = [];
        if (this.myPlaylists.length < 1) {
            this.playlistService.listMyPlaylists().then(function (hitList) {
                _this.myPlaylists = hitList.hits;
                _this.flagAddToPlaylist = true;
            }).catch(function (err) {
                _this.popupService.showPopup("Add To Playlists", "Load your playlists failed");
            });
        }
        else {
            this.flagAddToPlaylist = true;
        }
    };
    ManageTrackComponent.prototype.cancelAddToPlaylist = function () {
        console.log(this.trackPlaylistsDto);
        this.flagAddToPlaylist = false;
    };
    ManageTrackComponent.prototype.doAddToPlaylist = function () {
        var _this = this;
        this.playlistService.addTrack(this.trackPlaylistsDto.trackId, this.trackPlaylistsDto.playlistIds).then(function (response) {
            _this.popupService.showPopup("Add To Playlists", "Add track to playlit(s) success");
        }).catch(function (err) {
            _this.popupService.showPopup("Add To Playlists", "Add track to playlit(s) failed");
        }).then(function () {
            _this.cancelAddToPlaylist();
        });
    };
    ManageTrackComponent.prototype.ngOnDestroy = function () {
        this.storeUtil.cache.set('track:term', this.term);
        this.storeUtil.cache.set('track:orderby', this.orderby);
        this.storeUtil.cache.set('track:direction', this.direction);
        this.storeUtil.cache.set('track:page', '' + this.page);
    };
    ManageTrackComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "manage-track",
            template: "\n<h3>Tracks ({{totalTracks}})</h3>\n<p [permission]=\"appConfig.permissions.CREATE_TRACK\"><a routerLink=\"/tracks/new\">New Track</a></p>\n<div class=\"row\">\n    <div class=\"col-sm-6\">\n        <div class=\"input-group\">\n            <input type=\"text\" class=\"form-control\" [(ngModel)]=\"term\" name=\"term\" placeholder=\"Search\" (keypress)=\"enterSearch($event.keyCode)\" />\n            <div class=\"input-group-btn\">\n                <button class=\"btn btn-success\" (click)=\"searchTrack()\">Search</button>\n            </div>\n        </div>\n    </div>\n    <div class=\"col-sm-6\">\n        <div class=\"input-group\">\n            <label for=\"orderby\" class=\"col-sm-4 control-label\">Order by</label>\n            <div class=\"col-sm-4\">\n                <select class=\"form-control\" [(ngModel)]=\"orderby\" name=\"orderby\" (change)=\"onChange()\">\n                    <option value=\"id\">Update time</option>\n                    <option value=\"nameUnsign\">Track name</option>\n                    <option value=\"playTime\">Play times</option>\n                    <option value=\"downloadTime\">Download times</option>\n                </select>\n            </div>\n            <div class=\"col-sm-4\">\n                <select class=\"form-control\" [(ngModel)]=\"direction\" name=\"direction\" (change)=\"onChange()\">\n                <option value=\"asc\">Ascending</option>\n                <option value=\"desc\">Descending</option>\n                </select>\n            </div>\n        </div>\n    </div>\n</div>\n<pagination [pagination]=\"pagination\" (onSelectPage)=\"loadPage($event)\" (onPrePagination)=\"detectPrePagination($event)\" (onNextPagination)=\"detectNextPagination($event)\"></pagination>\n<list-track [tracks]=\"tracks\" (onDeleteItem)=\"deleteTrack($event)\" (onAddToPlaylist)=\"addToPlaylist($event)\"></list-track>\n<pagination [pagination]=\"pagination\" (onSelectPage)=\"loadPage($event)\" (onPrePagination)=\"detectPrePagination($event)\" (onNextPagination)=\"detectNextPagination($event)\"></pagination>\n\n<div [ngClass]=\"{'modal fade': true, 'hidden': !flagAddToPlaylist,'in': flagAddToPlaylist, 'show': flagAddToPlaylist}\" role=\"dialog\">\n<div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n    <div class=\"modal-header\">\n<button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"cancelAddToPlaylist()\"><span aria-hidden=\"true\" (click)=\"cancelAddToPlaylist()\">&times;</span></button>\n<h4 class=\"modal-title\">Add To Playlists</h4>\n</div>\n<div class=\"modal-body\">\n<track-to-playlist [model]=\"trackPlaylistsDto\" [myPlaylists]=\"myPlaylists\" (doSubmit)=\"doAddToPlaylist($event)\" (doCancel)=\"cancelAddToPlaylist()\"></track-to-playlist>\n</div>\n</div>\n</div>\n</div>\n"
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_track_service__["a" /* TrackService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_track_service__["a" /* TrackService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_8__services_popup_service__["a" /* PopupService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_8__services_popup_service__["a" /* PopupService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__services_playlist_service__["a" /* PlaylistService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__services_playlist_service__["a" /* PlaylistService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_7__configs_app_config__["a" /* AppConfig */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_7__configs_app_config__["a" /* AppConfig */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__services_image_service__["a" /* ImageService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_6__services_image_service__["a" /* ImageService */]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_9__utils_store_util__["a" /* StoreUtil */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_9__utils_store_util__["a" /* StoreUtil */]) === 'function' && _f) || Object])
    ], ManageTrackComponent);
    return ManageTrackComponent;
    var _a, _b, _c, _d, _e, _f;
}());



var NewTrackComponent = (function () {
    function NewTrackComponent(trackService, artistService, genreService, popupService, router) {
        this.trackService = trackService;
        this.artistService = artistService;
        this.genreService = genreService;
        this.popupService = popupService;
        this.router = router;
    }
    NewTrackComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.track = new __WEBPACK_IMPORTED_MODULE_10__models_track_dto__["a" /* TrackDto */]();
        this.artistService.listIdName().then(function (artists) { return _this.allArtists = artists; }).catch(function (err) { return console.log('Get artists fail', err); });
        this.genreService.listIdName().then(function (genres) { return _this.allGenres = genres; }).catch(function (err) { return console.log('Get genres fail', err); });
    };
    NewTrackComponent.prototype.saveTrack = function () {
        var _this = this;
        console.log(this.track);
        if (this.track.path != null) {
            this.trackService.saveFromUrl(this.track).then(function (data) {
                _this.popupService.showPopup("Save Track", "Save track success");
            }).catch(function (err) {
                _this.popupService.showPopup("Save Track", "Save track fail");
            });
        }
        else {
            this.trackService.upload(this.track).then(function (data) {
                _this.popupService.showPopup("Save Track", "Save track success");
            }).catch(function (err) {
                _this.popupService.showPopup("Save Track", "Save track fail");
            });
        }
    };
    NewTrackComponent.prototype.goBack = function () {
        this.router.navigate(['/tracks']);
    };
    NewTrackComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'new-track',
            template: "\n<h3>New Track</h3>\n<track-form [track]=\"track\" [artists]=\"allArtists\" [genres]=\"allGenres\" (doSubmit)=\"saveTrack($event)\" (doCancel)=\"goBack($event)\"></track-form>\n\n"
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_track_service__["a" /* TrackService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_track_service__["a" /* TrackService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_11__services_artist_service__["a" /* ArtistService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_11__services_artist_service__["a" /* ArtistService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_12__services_genre_service__["a" /* GenreService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_12__services_genre_service__["a" /* GenreService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_8__services_popup_service__["a" /* PopupService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_8__services_popup_service__["a" /* PopupService */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _e) || Object])
    ], NewTrackComponent);
    return NewTrackComponent;
    var _a, _b, _c, _d, _e;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/manage-track.component.js.map

/***/ }),

/***/ 455:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_track_service__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_image_service__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_audio_player_service__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_string_util__ = __webpack_require__(131);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayTrackComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PlayTrackComponent = (function () {
    function PlayTrackComponent(route, router, trackService, audioPlayer, stringUtil, el, renderer, imageService) {
        this.route = route;
        this.router = router;
        this.trackService = trackService;
        this.audioPlayer = audioPlayer;
        this.stringUtil = stringUtil;
        this.el = el;
        this.renderer = renderer;
        this.imageService = imageService;
        this.isAudioVisualationRendered = false;
        this.fnOnTimeUpdate = null;
        this.fnOnPlay = null;
        this.fnOnPause = null;
        this.fnOnEnded = null;
    }
    PlayTrackComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.audioPlayer.shouldShowPersistent = false;
        this.sub = this.route.params.subscribe(function (params) {
            var id = params["id"];
            if (_this.audioPlayer.track.id == id) {
                _this.viewBtnPlay.nativeElement.classList.remove('btn-play');
                _this.viewBtnPlay.nativeElement.classList.add('btn-pause');
                _this.viewMyCanvas.nativeElement.appendChild(_this.audioPlayer.getAudioVisualation());
                _this.registerEvents();
            }
            else
                _this.trackService.getOne(id).then(function (track) {
                    _this.audioPlayer.returnPath = "/" + track.nameUnsign + "/" + track.id;
                    _this.audioPlayer.arrTrack = [track];
                    _this.audioPlayer.playTrack(0).then(function () {
                        _this.viewBtnPlay.nativeElement.classList.remove('btn-play');
                        _this.viewBtnPlay.nativeElement.classList.add('btn-pause');
                        _this.viewMyCanvas.nativeElement.appendChild(_this.audioPlayer.getAudioVisualation());
                        _this.registerEvents();
                    });
                }).catch(function (err) { return console.log("Play track failed", err); });
        });
        //Play/Pause
        this.renderer.listen(this.viewBtnPlay.nativeElement, "click", function (event) {
            if (_this.audioPlayer.isPlaying()) {
                _this.viewBtnPlay.nativeElement.classList.remove('btn-pause');
                _this.viewBtnPlay.nativeElement.classList.add('btn-play');
                _this.audioPlayer.pause();
            }
            else {
                _this.viewBtnPlay.nativeElement.classList.remove('btn-play');
                _this.viewBtnPlay.nativeElement.classList.add('btn-pause');
                _this.audioPlayer.play();
            }
        });
        //Loop or not
        this.renderer.listen(this.viewBtnLoop.nativeElement, "click", function (event) {
            if (_this.audioPlayer.isLoop()) {
                _this.audioPlayer.setLoop(false);
                _this.viewBtnLoop.nativeElement.classList.add('disabled');
            }
            else {
                _this.audioPlayer.setLoop(true);
                _this.viewBtnLoop.nativeElement.classList.remove('disabled');
            }
        });
        //Volume
        this.renderer.listen(this.viewBtnVolume.nativeElement, "click", function (event) {
            if (_this.viewVolumeSlider.nativeElement.classList.contains('hidden')) {
                _this.viewVolumeSlider.nativeElement.classList.remove('hidden');
            }
            else {
                _this.viewVolumeSlider.nativeElement.classList.add('hidden');
            }
        });
        this.renderer.listen(this.viewVolumeSliderBar.nativeElement, "change", function (event) {
            var volume = _this.viewVolumeSliderBar.nativeElement.value;
            _this.audioPlayer.setVolume(volume);
            if (volume == 0) {
                _this.viewBtnVolume.nativeElement.classList.add('muted');
            }
            else {
                _this.viewBtnVolume.nativeElement.classList.remove('muted');
            }
        });
        //Audio seek
        this.renderer.listen(this.viewProgressBar.nativeElement, "click", function (event) {
            var progress = event.offsetX / _this.viewProgressBar.nativeElement.offsetWidth;
            var duration = _this.audioPlayer.getDuration();
            var currentTime = progress * duration;
            _this.audioPlayer.seek(currentTime);
        });
        //Fast forward
        this.renderer.listen(this.viewBtnFastForward.nativeElement, "click", function (event) {
            var duration = _this.audioPlayer.getDuration();
            var currentTime = _this.audioPlayer.getCurrentTime() + 0.02 * duration;
            _this.audioPlayer.seek(currentTime);
        });
        //Rewind
        this.renderer.listen(this.viewBtnRewind.nativeElement, "click", function (event) {
            var duration = _this.audioPlayer.getDuration();
            var currentTime = _this.audioPlayer.getCurrentTime() - 0.02 * duration;
            _this.audioPlayer.seek(currentTime);
        });
    };
    PlayTrackComponent.prototype.registerEvents = function () {
        var _this = this;
        //Show progress
        if (this.fnOnTimeUpdate == null) {
            this.fnOnTimeUpdate = this.audioPlayer.onTimeUpdate(function () {
                var currentTime = _this.audioPlayer.getCurrentTime();
                var duration = _this.audioPlayer.getDuration();
                var progress = Math.floor(currentTime * 10000 / duration) / 100;
                if (progress < 98) {
                    _this.viewProgress.nativeElement.style.width = progress + "%";
                }
                _this.viewTimeSpan.nativeElement.innerHTML = _this.stringUtil.convertTime(Math.floor(currentTime));
                _this.viewTimeRemain.nativeElement.innerHTML = _this.stringUtil.convertTime(Math.floor(duration - currentTime));
            });
        }
        //Audio ended
        if (this.fnOnEnded == null) {
            this.fnOnEnded = this.audioPlayer.onEnded(function () {
                _this.viewBtnPlay.nativeElement.classList.remove('btn-pause');
                _this.viewBtnPlay.nativeElement.classList.add('btn-play');
            });
        }
        if (this.fnOnPause == null) {
            this.fnOnPause = this.audioPlayer.onPause(function () {
                _this.viewBtnPlay.nativeElement.classList.remove('btn-pause');
                _this.viewBtnPlay.nativeElement.classList.add('btn-play');
            });
        }
        if (this.fnOnPlay == null) {
            this.fnOnPlay = this.audioPlayer.onPlay(function () {
                _this.viewBtnPlay.nativeElement.classList.remove('btn-play');
                _this.viewBtnPlay.nativeElement.classList.add('btn-pause');
                _this.loadRelativeTrack(_this.audioPlayer.track);
            });
        }
    };
    PlayTrackComponent.prototype.ngOnDestroy = function () {
        if (this.audioPlayer.isPlaying()) {
            this.audioPlayer.shouldShowPersistent = true;
        }
        else {
            this.audioPlayer.shouldShowPersistent = false;
        }
        this.sub.unsubscribe();
        if (this.fnOnTimeUpdate !== null) {
            this.audioPlayer.removeOnTimeUpdate(this.fnOnTimeUpdate);
        }
        if (this.fnOnEnded !== null) {
            this.audioPlayer.removeOnEnded(this.fnOnEnded);
        }
        if (this.fnOnPause !== null) {
            this.audioPlayer.removeOnEnded(this.fnOnPause);
        }
        if (this.fnOnPlay !== null) {
            this.audioPlayer.removeOnEnded(this.fnOnPlay);
        }
    };
    PlayTrackComponent.prototype.loadRelativeTrack = function (track) {
        var _this = this;
        this.trackService.query(0, 10, this.stringUtil.convertoUnsignKeepSpace(track.artist.split('-')[0].trim()), 'playTime:desc').then(function (hitList) {
            _this.relativeTracks = hitList.hits;
            _this.relativeTracks.forEach(function (item, i) {
                _this.imageService.getAlbumArt(item.albumArt, 120, 120).then(function (src) { return item.albumArtUrl = src; });
            });
        }).catch(function (err) { return console.log("Load relative tracks failed", err); });
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("audioPlayer"), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _a) || Object)
    ], PlayTrackComponent.prototype, "viewAudioPlayer", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("myCanvas"), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _b) || Object)
    ], PlayTrackComponent.prototype, "viewMyCanvas", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("progressBar"), 
        __metadata('design:type', (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _c) || Object)
    ], PlayTrackComponent.prototype, "viewProgressBar", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("progress"), 
        __metadata('design:type', (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _d) || Object)
    ], PlayTrackComponent.prototype, "viewProgress", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("timeSpan"), 
        __metadata('design:type', (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _e) || Object)
    ], PlayTrackComponent.prototype, "viewTimeSpan", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("timeRemain"), 
        __metadata('design:type', (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _f) || Object)
    ], PlayTrackComponent.prototype, "viewTimeRemain", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("btnPlay"), 
        __metadata('design:type', (typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _g) || Object)
    ], PlayTrackComponent.prototype, "viewBtnPlay", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("btnLoop"), 
        __metadata('design:type', (typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _h) || Object)
    ], PlayTrackComponent.prototype, "viewBtnLoop", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("btnFastForward"), 
        __metadata('design:type', (typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _j) || Object)
    ], PlayTrackComponent.prototype, "viewBtnFastForward", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("btnRewind"), 
        __metadata('design:type', (typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _k) || Object)
    ], PlayTrackComponent.prototype, "viewBtnRewind", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("btnVolume"), 
        __metadata('design:type', (typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _l) || Object)
    ], PlayTrackComponent.prototype, "viewBtnVolume", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("volumeSlider"), 
        __metadata('design:type', (typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _m) || Object)
    ], PlayTrackComponent.prototype, "viewVolumeSlider", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("volumeSliderBar"), 
        __metadata('design:type', (typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _o) || Object)
    ], PlayTrackComponent.prototype, "viewVolumeSliderBar", void 0);
    PlayTrackComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "play-track",
            template: "\n<div class=\"row\">\n    <div class=\"col-sm-9\">\n    <div #myCanvas class=\"audio-visualation\"></div>\n        <div #audioPayer class=\"audio-player\">\n    <img [ngClass]=\"{'album-art-circle album-art': true, 'rotate-z': audioPlayer.isPlaying()}\" [src]=\"audioPlayer.track.albumArt ? audioPlayer.track.albumArt : ''\"/>\n            <div class=\"track-info\">\n            <div class=\"track-name\">{{audioPlayer.track.name}}</div>\n            <div class=\"track-artist\">{{audioPlayer.track.artist}}</div>\n            </div>\n            <div #progressBar class=\"play-progress-bar\">\n                <div #progress class=\"play-progress\">\n                    <div class=\"pointer\"></div>\n                </div>\n            </div>\n            <div class=\"time-duration\">\n                <div #timeSpan class=\"time-span\"></div>\n                <div #timeRemain class=\"time-remain\"></div>\n            </div>\n            <div #btnLoop class=\"btn-loop\"></div>\n            <div #btnPlay class=\"btn-play\"></div>\n            <div #btnFastForward class=\"btn-fast-forward\"></div>\n            <div #btnRewind class=\"btn-rewind\"></div>\n            <div #btnVolume class=\"btn-volume\"></div>\n            <div #volumeSlider class=\"volume-slider hidden\">\n                <input #volumeSliderBar type=\"range\" min=\"0\" max=\"1.0\" value=\"{{this.audioPlayer.getVolume()}}\" step=\"0.1\" />\n            </div>\n        </div>\n    </div>\n</div>\n<div class=\"row\">\n    <h3>Relative tracks</h3>\n<list-track [tracks]=\"relativeTracks\" [?controls]=\"false\"></list-track>\n</div>\n"
        }), 
        __metadata('design:paramtypes', [(typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === 'function' && _p) || Object, (typeof (_q = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _q) || Object, (typeof (_r = typeof __WEBPACK_IMPORTED_MODULE_2__services_track_service__["a" /* TrackService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_track_service__["a" /* TrackService */]) === 'function' && _r) || Object, (typeof (_s = typeof __WEBPACK_IMPORTED_MODULE_4__services_audio_player_service__["a" /* AudioPlayer */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services_audio_player_service__["a" /* AudioPlayer */]) === 'function' && _s) || Object, (typeof (_t = typeof __WEBPACK_IMPORTED_MODULE_5__utils_string_util__["a" /* StringUtil */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__utils_string_util__["a" /* StringUtil */]) === 'function' && _t) || Object, (typeof (_u = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _u) || Object, (typeof (_v = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]) === 'function' && _v) || Object, (typeof (_w = typeof __WEBPACK_IMPORTED_MODULE_3__services_image_service__["a" /* ImageService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_image_service__["a" /* ImageService */]) === 'function' && _w) || Object])
    ], PlayTrackComponent);
    return PlayTrackComponent;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/play-track.component.js.map

/***/ }),

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_user_model__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_user_service__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_popup_service__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangePasswordComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ChangePasswordComponent = (function () {
    function ChangePasswordComponent(authService, router, popupService, userService) {
        this.authService = authService;
        this.router = router;
        this.popupService = popupService;
        this.userService = userService;
    }
    ChangePasswordComponent.prototype.ngOnInit = function () {
        this.user = new __WEBPACK_IMPORTED_MODULE_2__models_user_model__["a" /* User */]();
        this.user.username = this.authService.getUsername();
    };
    ChangePasswordComponent.prototype.changePassword = function () {
        var _this = this;
        this.userService.changePassword(this.user).then(function (data) {
            _this.popupService.showPopup("Change password", "Change password success");
        })
            .catch(function (err) {
            _this.popupService.showPopup("Change password", "Change password fail. " + err["_body"]);
        });
    };
    ChangePasswordComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "change-password",
            template: "\n<h3>Change password: {{authService.getUsername()}}</h3>\n<div [hidden]=\"!err\" class=\"alert alert-danger\" role=\"alert\">{{err}}</div>\n<form class=\"form-horizontal\" (ngSubmit)=\"changePassword()\" #myForm=\"ngForm\">\n    <div [ngClass]=\"{'has-error': !(curPassword.valid || curPassword.pristine), 'form-group': true}\">\n    <label for=\"curPassword0\" class=\"col-sm-2 control-label\">Current Password</label>\n    <div class=\"col-sm-10\">\n    <input type=\"password\" class=\"form-control\" [(ngModel)]=\"user.curPassword\" #curPassword=\"ngModel\" name=\"curPassword0\" placeholder=\"Password\" required />\n    <span class=\"help-block\" [hidden]=\"curPassword.valid || curPassword.pristine\">\n    {{ curPassword.errors ? curPassword.errors.required ? \"Password is required\" : \"\" : \"\"}}\n    </span>\n    </div>\n    </div>\n    <div [ngClass]=\"{'has-error': !(password.valid || password.pristine), 'form-group': true}\">\n    <label for=\"password0\" class=\"col-sm-2 control-label\">New Password</label>\n    <div class=\"col-sm-10\">\n<input type=\"password\" class=\"form-control\" [(ngModel)]=\"user.password\" #password=\"ngModel\" name=\"password0\" placeholder=\"New Password\" required minlength=\"5\" maxlength=\"32\"/>\n    <span class=\"help-block\" [hidden]=\"password.valid || password.pristine\">\n    {{ password.errors ? \n        password.errors.required ? 'New password is required' :\n        password.errors.minlength ? 'Min length is 5' :\n        password.errors.maxlength ? 'Max length is 32' :\n'' : ''}}\n    </span>\n    </div>\n    </div>\n    <div [ngClass]=\"{'has-error': !(confirmPassword.valid || confirmPassword.pristine), 'form-group': true}\">\n    <label for=\"confirmPassword0\" class=\"col-sm-2 control-label\">Confirm Password</label>\n    <div class=\"col-sm-10\">\n<input type=\"password\" class=\"form-control\" [(ngModel)]=\"user.confirmPassword\" #confirmPassword=\"ngModel\" name=\"confirmPassword0\" placeholder=\"Confirm Password\" required pattern=\"{{user.password}}\" />\n    <span class=\"help-block\" [hidden]=\"confirmPassword.valid || confirmPassword.pristine\">\n    {{ confirmPassword.errors ? \n        confirmPassword.errors.required ? 'Confirm password is required' :\n        confirmPassword.errors.pattern ? 'Confirm password is not matched' :\n'' : ''}}\n    </span>\n    </div>\n    </div>\n    <div class=\"form-group\">\n    <div class=\"col-sm-offset-2 col-sm-10\">\n    <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"!myForm.valid\">Submit</button>\n    <button type=\"reset\" class=\"btn btn-default\" >Cancel</button>\n    </div>\n    </div>\n</form>\n"
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__services_popup_service__["a" /* PopupService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__services_popup_service__["a" /* PopupService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services_user_service__["a" /* UserService */]) === 'function' && _d) || Object])
    ], ChangePasswordComponent);
    return ChangePasswordComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/profile.component.js.map

/***/ }),

/***/ 457:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_user_model__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(144);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserLoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserLoginComponent = (function () {
    function UserLoginComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    UserLoginComponent.prototype.ngOnInit = function () {
        this.user = new __WEBPACK_IMPORTED_MODULE_2__models_user_model__["a" /* User */]();
        this.err = { errors: {} };
    };
    UserLoginComponent.prototype.login = function () {
        var _this = this;
        this.err = { errors: {} };
        this.authService.login(this.user)
            .then(function (data) { _this.authService.storeToken(data) ? _this.router.navigate(['/']) : _this.err = "Token is invalid"; })
            .catch(function (err) {
            _this.err = err.json();
            //this.err.message = "Authentication service is not available right now. Try again.";
            //console.log(err);
        });
    };
    UserLoginComponent.prototype.goBack = function () {
        this.router.navigate(['/']);
    };
    UserLoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "user-login",
            template: "\n<h3>Login</h3>\n<div [hidden]=\"!(err.message && err.errors && !err.errors.usename && !err.errors.password)\" class=\"alert alert-danger\" role=\"alert\">{{err.message}}</div>\n<login [user]=\"user\" [(serverErrors)]=\"err.errors\" (doSubmit)=\"login($event)\" (doCancel)=\"goBack($event)\"></login>\n"
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _b) || Object])
    ], UserLoginComponent);
    return UserLoginComponent;
    var _a, _b;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/user-login.component.js.map

/***/ }),

/***/ 458:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrackPlaylistsDto; });
var TrackPlaylistsDto = (function () {
    function TrackPlaylistsDto() {
    }
    return TrackPlaylistsDto;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/track-playlists.dto.js.map

/***/ }),

/***/ 507:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(544);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(579);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(561);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/main.js.map

/***/ }),

/***/ 561:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(538);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_app_component__ = __webpack_require__(563);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_routes__ = __webpack_require__(562);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_common_navigation_component__ = __webpack_require__(567);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_common_dash_board_component__ = __webpack_require__(448);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__directives_permission_directive__ = __webpack_require__(577);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__configs_app_config__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_track_list_track_component__ = __webpack_require__(573);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_track_track_form_component__ = __webpack_require__(574);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_track_play_track_component__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_track_edit_track_component__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_track_manage_track_component__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_common_pagination_component__ = __webpack_require__(568);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_playlist_list_playlist_component__ = __webpack_require__(570);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_playlist_manage_playlist_component__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_playlist_new_playlist_component__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_playlist_edit_playlist_component__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_playlist_play_playlist_component__ = __webpack_require__(452);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_playlist_playlist_form_component__ = __webpack_require__(571);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_track_hits_track_component__ = __webpack_require__(572);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_common_audio_player_component__ = __webpack_require__(566);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__components_track_track_to_playlist_component__ = __webpack_require__(575);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__components_artist_list_artist_component__ = __webpack_require__(565);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_artist_manage_artist_component__ = __webpack_require__(446);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__components_artist_new_artist_component__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__components_artist_edit_artist_component__ = __webpack_require__(445);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__components_artist_artist_form_component__ = __webpack_require__(564);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__components_user_user_login_component__ = __webpack_require__(457);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__components_user_login_component__ = __webpack_require__(576);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__components_user_profile_component__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__components_common_popup_component__ = __webpack_require__(569);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__services_popup_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__services_audio_player_service__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__services_user_service__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__services_auth_service__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__services_track_service__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__services_playlist_service__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__services_artist_service__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__services_genre_service__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__services_image_service__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__utils_string_util__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__utils_store_util__ = __webpack_require__(372);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













































var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_5__app_routes__["a" /* routing */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["HttpModule"]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__components_app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_6__components_common_navigation_component__["a" /* NavigationComponent */],
                __WEBPACK_IMPORTED_MODULE_8__directives_permission_directive__["a" /* PermissionDirective */],
                __WEBPACK_IMPORTED_MODULE_7__components_common_dash_board_component__["a" /* DashBoardComponent */],
                __WEBPACK_IMPORTED_MODULE_15__components_common_pagination_component__["a" /* PaginationComponent */],
                __WEBPACK_IMPORTED_MODULE_33__components_common_popup_component__["a" /* PopupComponent */],
                __WEBPACK_IMPORTED_MODULE_22__components_track_hits_track_component__["a" /* HitsTrackComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_track_list_track_component__["a" /* ListTrackComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_track_track_form_component__["a" /* TrackFormComponent */],
                __WEBPACK_IMPORTED_MODULE_14__components_track_manage_track_component__["a" /* ManageTrackComponent */],
                __WEBPACK_IMPORTED_MODULE_14__components_track_manage_track_component__["b" /* NewTrackComponent */],
                __WEBPACK_IMPORTED_MODULE_13__components_track_edit_track_component__["a" /* EditTrackComponent */],
                __WEBPACK_IMPORTED_MODULE_12__components_track_play_track_component__["a" /* PlayTrackComponent */],
                __WEBPACK_IMPORTED_MODULE_24__components_track_track_to_playlist_component__["a" /* TrackToPlaylistComponent */],
                __WEBPACK_IMPORTED_MODULE_16__components_playlist_list_playlist_component__["a" /* ListPlaylistComponent */],
                __WEBPACK_IMPORTED_MODULE_17__components_playlist_manage_playlist_component__["a" /* ManagePlaylistComponent */],
                __WEBPACK_IMPORTED_MODULE_18__components_playlist_new_playlist_component__["a" /* NewPlaylistComponent */],
                __WEBPACK_IMPORTED_MODULE_19__components_playlist_edit_playlist_component__["a" /* EditPlaylistComponent */],
                __WEBPACK_IMPORTED_MODULE_21__components_playlist_playlist_form_component__["a" /* PlaylistFormComponent */],
                __WEBPACK_IMPORTED_MODULE_20__components_playlist_play_playlist_component__["a" /* PlayPlaylistComponent */],
                __WEBPACK_IMPORTED_MODULE_25__components_artist_list_artist_component__["a" /* ListArtistComponent */],
                __WEBPACK_IMPORTED_MODULE_26__components_artist_manage_artist_component__["a" /* ManageArtistComponent */],
                __WEBPACK_IMPORTED_MODULE_27__components_artist_new_artist_component__["a" /* NewArtistComponent */],
                __WEBPACK_IMPORTED_MODULE_28__components_artist_edit_artist_component__["a" /* EditArtistComponent */],
                __WEBPACK_IMPORTED_MODULE_29__components_artist_artist_form_component__["a" /* ArtistFormComponent */],
                __WEBPACK_IMPORTED_MODULE_30__components_user_user_login_component__["a" /* UserLoginComponent */],
                __WEBPACK_IMPORTED_MODULE_31__components_user_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_32__components_user_profile_component__["a" /* ChangePasswordComponent */],
                __WEBPACK_IMPORTED_MODULE_23__components_common_audio_player_component__["a" /* AudioPlayerComponent */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_9__configs_app_config__["a" /* AppConfig */],
                __WEBPACK_IMPORTED_MODULE_37__services_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_38__services_track_service__["a" /* TrackService */],
                __WEBPACK_IMPORTED_MODULE_35__services_audio_player_service__["a" /* AudioPlayer */],
                __WEBPACK_IMPORTED_MODULE_42__services_image_service__["a" /* ImageService */],
                __WEBPACK_IMPORTED_MODULE_43__utils_string_util__["a" /* StringUtil */],
                __WEBPACK_IMPORTED_MODULE_39__services_playlist_service__["a" /* PlaylistService */],
                __WEBPACK_IMPORTED_MODULE_34__services_popup_service__["a" /* PopupService */],
                __WEBPACK_IMPORTED_MODULE_40__services_artist_service__["a" /* ArtistService */],
                __WEBPACK_IMPORTED_MODULE_41__services_genre_service__["a" /* GenreService */],
                __WEBPACK_IMPORTED_MODULE_36__services_user_service__["a" /* UserService */],
                __WEBPACK_IMPORTED_MODULE_44__utils_store_util__["a" /* StoreUtil */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__components_app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/app.module.js.map

/***/ }),

/***/ 562:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_common_dash_board_component__ = __webpack_require__(448);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_track_manage_track_component__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_track_play_track_component__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_track_edit_track_component__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_playlist_manage_playlist_component__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_playlist_new_playlist_component__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_playlist_edit_playlist_component__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_playlist_play_playlist_component__ = __webpack_require__(452);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_artist_manage_artist_component__ = __webpack_require__(446);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_artist_new_artist_component__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_artist_edit_artist_component__ = __webpack_require__(445);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_user_user_login_component__ = __webpack_require__(457);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_user_profile_component__ = __webpack_require__(456);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });














var appRoutes = [
    {
        path: "",
        //redirectTo: "/dashboard",
        //pathMatch: "full"
        component: __WEBPACK_IMPORTED_MODULE_1__components_common_dash_board_component__["a" /* DashBoardComponent */]
    },
    {
        path: "login",
        component: __WEBPACK_IMPORTED_MODULE_12__components_user_user_login_component__["a" /* UserLoginComponent */]
    },
    {
        path: "profile/change-password",
        component: __WEBPACK_IMPORTED_MODULE_13__components_user_profile_component__["a" /* ChangePasswordComponent */]
    },
    {
        path: "artists",
        component: __WEBPACK_IMPORTED_MODULE_9__components_artist_manage_artist_component__["a" /* ManageArtistComponent */]
    },
    {
        path: "artists/new",
        component: __WEBPACK_IMPORTED_MODULE_10__components_artist_new_artist_component__["a" /* NewArtistComponent */]
    },
    {
        path: "artists/:nameUsign/:id/edit",
        component: __WEBPACK_IMPORTED_MODULE_11__components_artist_edit_artist_component__["a" /* EditArtistComponent */]
    },
    {
        path: "playlists",
        component: __WEBPACK_IMPORTED_MODULE_5__components_playlist_manage_playlist_component__["a" /* ManagePlaylistComponent */]
    },
    {
        path: "playlists/new",
        component: __WEBPACK_IMPORTED_MODULE_6__components_playlist_new_playlist_component__["a" /* NewPlaylistComponent */]
    },
    {
        path: "playlists/:nameUnsign/:id/edit",
        component: __WEBPACK_IMPORTED_MODULE_7__components_playlist_edit_playlist_component__["a" /* EditPlaylistComponent */]
    },
    {
        path: "playlists/:nameUnsign/:id",
        component: __WEBPACK_IMPORTED_MODULE_8__components_playlist_play_playlist_component__["a" /* PlayPlaylistComponent */]
    },
    {
        path: "tracks",
        component: __WEBPACK_IMPORTED_MODULE_2__components_track_manage_track_component__["a" /* ManageTrackComponent */]
    },
    {
        path: "tracks/new",
        component: __WEBPACK_IMPORTED_MODULE_2__components_track_manage_track_component__["b" /* NewTrackComponent */]
    },
    {
        path: "tracks/:nameUnsign/:id/edit",
        component: __WEBPACK_IMPORTED_MODULE_4__components_track_edit_track_component__["a" /* EditTrackComponent */]
    },
    {
        path: ":nameUnsign/:id",
        component: __WEBPACK_IMPORTED_MODULE_3__components_track_play_track_component__["a" /* PlayTrackComponent */]
    },
    {
        path: "category/edit/:titleUnsign/:id",
        component: __WEBPACK_IMPORTED_MODULE_1__components_common_dash_board_component__["a" /* DashBoardComponent */]
    }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* RouterModule */].forRoot(appRoutes);
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/app.routes.js.map

/***/ }),

/***/ 563:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = "TMusic";
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(739),
            styles: [__webpack_require__(738)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/app.component.js.map

/***/ }),

/***/ 564:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_artist_model__ = __webpack_require__(366);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArtistFormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ArtistFormComponent = (function () {
    function ArtistFormComponent(renderer) {
        this.renderer = renderer;
        this.artist = new __WEBPACK_IMPORTED_MODULE_1__models_artist_model__["a" /* Artist */]();
        this.doSubmit = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.doCancel = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    ArtistFormComponent.prototype.invokeSubmit = function (e) {
        this.doSubmit.next(e);
    };
    ArtistFormComponent.prototype.invokeCancel = function (e) {
        this.doCancel.next(e);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])("artist"), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_artist_model__["a" /* Artist */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__models_artist_model__["a" /* Artist */]) === 'function' && _a) || Object)
    ], ArtistFormComponent.prototype, "artist", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])("doSubmit"), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === 'function' && _b) || Object)
    ], ArtistFormComponent.prototype, "doSubmit", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])("doCancel"), 
        __metadata('design:type', (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === 'function' && _c) || Object)
    ], ArtistFormComponent.prototype, "doCancel", void 0);
    ArtistFormComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "artist-form",
            template: "\n<form class=\"form-horizontal\" (ngSubmit)=\"invokeSubmit()\" #myForm=\"ngForm\">\n<div [ngClass]=\"{'has-error': !(name.valid || name.pristine), 'form-group': true}\">\n    <label for=\"name\" class=\"col-sm-2 control-label\">Name</label>\n    <div class=\"col-sm-10\">\n    <input type=\"text\" class=\"form-control\" [(ngModel)]=\"artist.name\" #name=\"ngModel\" name=\"name\" placeholder=\"Name\" required />\n    <span class=\"help-block\" [hidden]=\"name.valid || name.pristine\">\n    {{ name.required ? \"Artist name is required\" : \"\"}}\n    </span>\n    </div>\n</div>\n<div class=\"form-group\">\n<label for=\"short-info\" class=\"col-sm-2 control-label\">Short Info</label>\n<div class=\"col-sm-10\">\n<textarea class=\"form-control\" [(ngModel)]=\"artist.shortInfo\" name=\"short-info\" rows=\"6\" ></textarea>\n</div>\n</div>\n<div class=\"form-group\">\n<div class=\"col-sm-offset-2 col-sm-10\">\n<button type=\"submit\" class=\"btn btn-success\" [disabled]=\"!myForm.valid\">Save</button>\n<button type=\"reset\" class=\"btn btn-default\" (click)=\"invokeCancel()\">Cancel</button>\n</div>\n</div>\n</form>\n"
        }), 
        __metadata('design:paramtypes', [(typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]) === 'function' && _d) || Object])
    ], ArtistFormComponent);
    return ArtistFormComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/artist-form.component.js.map

/***/ }),

/***/ 565:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__configs_app_config__ = __webpack_require__(24);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListArtistComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListArtistComponent = (function () {
    function ListArtistComponent(appConfig) {
        this.appConfig = appConfig;
        this.onDeleteItem = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    ListArtistComponent.prototype.invokeDeleteItem = function (e) {
        this.onDeleteItem.next(e);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])("artists"), 
        __metadata('design:type', Array)
    ], ListArtistComponent.prototype, "artists", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])("onDeleteItem"), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === 'function' && _a) || Object)
    ], ListArtistComponent.prototype, "onDeleteItem", void 0);
    ListArtistComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "list-artist",
            template: "\n<table class=\"table\">\n    <tr>\n        <th class=\"col-sm-1\">ID</th>\n        <th class=\"col-sm-3\">Name</th>\n        <th class=\"col-sm-3\">Name Unsign</th>\n        <th class=\"col-sm-3\">Short Info</th>\n        <th class=\"col-sm-2\"></th>\n    </tr>\n    <tr *ngFor=\"let item of artists\">\n    <td>{{item.id}}</td>\n    <td><a routerLink=\"/{{item.nameUnsign}}/{{item.id}}\">{{item.name}}</a></td>\n    <td>{{item.nameUnsign}}</td>\n    <td>{{item.shortInfo}}</td>\n    <td>\n        <a routerLink=\"/artists/{{item.nameUnsign}}/{{item.id}}\" class=\"btn btn-sm btn-info\" role=\"button\">Details</a>\n<a routerLink=\"/artists/{{item.nameUnsign}}/{{item.id}}/edit\" class=\"btn btn-sm btn-success\" role=\"button\" [permission]=\"appConfig.permissions.UPDATE_ARTIST\">Edit</a>\n<button class=\"btn btn-sm btn-danger\" (click)=\"invokeDeleteItem(item)\" [permission]=\"appConfig.permissions.DELETE_ARTIST\">Delete</button>\n        </td>\n    </tr>\n</table>\n"
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__configs_app_config__["a" /* AppConfig */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__configs_app_config__["a" /* AppConfig */]) === 'function' && _b) || Object])
    ], ListArtistComponent);
    return ListArtistComponent;
    var _a, _b;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/list-artist.component.js.map

/***/ }),

/***/ 566:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_track_service__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_playlist_service__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_image_service__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_audio_player_service__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_string_util__ = __webpack_require__(131);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AudioPlayerComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AudioPlayerComponent = (function () {
    function AudioPlayerComponent(route, router, playlistService, trackService, audioPlayer, stringUtil, el, renderer, imageService) {
        this.route = route;
        this.router = router;
        this.playlistService = playlistService;
        this.trackService = trackService;
        this.audioPlayer = audioPlayer;
        this.stringUtil = stringUtil;
        this.el = el;
        this.renderer = renderer;
        this.imageService = imageService;
        this.fnOnTimeUpdate = null;
        this.fnOnPlay = null;
        this.fnOnPause = null;
        this.fnOnEnded = null;
    }
    AudioPlayerComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.fnOnEnded == null) {
            this.fnOnEnded = this.audioPlayer.onEnded(function () {
                _this.viewBtnPlay.nativeElement.classList.remove('btn-pause');
                _this.viewBtnPlay.nativeElement.classList.add('btn-play');
            });
        }
        if (this.fnOnPause == null) {
            this.fnOnPause = this.audioPlayer.onPause(function () {
                _this.viewBtnPlay.nativeElement.classList.remove('btn-pause');
                _this.viewBtnPlay.nativeElement.classList.add('btn-play');
            });
        }
        if (this.fnOnPlay == null) {
            this.fnOnPlay = this.audioPlayer.onPlay(function () {
                _this.viewBtnPlay.nativeElement.classList.remove('btn-play');
                _this.viewBtnPlay.nativeElement.classList.add('btn-pause');
            });
        }
        //Play/Pause
        this.renderer.listen(this.viewBtnPlay.nativeElement, "click", function (event) {
            if (_this.audioPlayer.isPlaying()) {
                _this.viewBtnPlay.nativeElement.classList.remove('btn-pause');
                _this.viewBtnPlay.nativeElement.classList.add('btn-play');
                _this.audioPlayer.pause();
            }
            else {
                _this.viewBtnPlay.nativeElement.classList.remove('btn-play');
                _this.viewBtnPlay.nativeElement.classList.add('btn-pause');
                _this.audioPlayer.play();
            }
        });
        //Audio seek
        this.renderer.listen(this.viewProgressBar.nativeElement, "click", function (event) {
            var progress = event.offsetX / _this.viewProgressBar.nativeElement.offsetWidth;
            var duration = _this.audioPlayer.getDuration();
            var currentTime = progress * duration;
            _this.audioPlayer.seek(currentTime);
        });
        //Show progress
        if (this.fnOnTimeUpdate == null) {
            this.fnOnTimeUpdate = this.audioPlayer.onTimeUpdate(function () {
                var currentTime = _this.audioPlayer.getCurrentTime();
                var duration = _this.audioPlayer.getDuration();
                var progress = Math.floor(currentTime * 10000 / duration) / 100;
                if (progress < 98) {
                    _this.viewProgress.nativeElement.style.width = progress + "%";
                }
            });
        }
    };
    AudioPlayerComponent.prototype.ngOnDestroy = function () {
        if (this.fnOnTimeUpdate !== null) {
            this.audioPlayer.removeOnTimeUpdate(this.fnOnTimeUpdate);
        }
        if (this.fnOnEnded !== null) {
            this.audioPlayer.removeOnEnded(this.fnOnEnded);
        }
        if (this.fnOnPause !== null) {
            this.audioPlayer.removeOnEnded(this.fnOnPause);
        }
        if (this.fnOnPlay !== null) {
            this.audioPlayer.removeOnEnded(this.fnOnPlay);
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("progressBar"), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _a) || Object)
    ], AudioPlayerComponent.prototype, "viewProgressBar", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("progress"), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _b) || Object)
    ], AudioPlayerComponent.prototype, "viewProgress", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("btnPlay"), 
        __metadata('design:type', (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _c) || Object)
    ], AudioPlayerComponent.prototype, "viewBtnPlay", void 0);
    AudioPlayerComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "audio-player",
            template: "\n    <footer [hidden]=\"!audioPlayer.shouldShowPersistent\" class=\"navbar navbar-fixed-bottom\">\n    <div class=\"container-fluid persistent-player\">\n    <a routerLink=\"{{audioPlayer.returnPath}}\">\n<img [ngClass]=\"{'album-art': true, 'rotate-z': audioPlayer.isPlaying()}\" [src]=\"audioPlayer.track.albumArt ? audioPlayer.track.albumArt : 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?url=https://doc-0k-30-docs.googleusercontent.com/docs/securesc/ha0ro937gcuc7l7deffksulhg5h7mbp1/htt0n0mpo2k6igkdssgcgbtf4604cjvk/1489204800000/16223458872939565467/*/0B-KJ-2p15TKBSEdjRlMxRTZPNkU&container=focus&resize_w=150&resize_h=150&refresh=846000'\"/>\n    </a>\n        <div class=\"track-info\">\n    <div class=\"track-name truncate-text\">{{audioPlayer.track.name}}</div>\n    <div class=\"track-artist truncate-text\">{{audioPlayer.track.artist}}</div>\n        </div>\n        <div #progressBar class=\"play-progress-bar\">\n            <div #progress class=\"play-progress\">\n                <div class=\"pointer\"></div>\n            </div>\n        </div>\n        <div #btnPlay class=\"btn-play\"></div>\n    <div (click)=\"toogle()\" class=\"btn-pause btn-list\"></div>\n    </div>\n</footer>\n    "
        }), 
        __metadata('design:paramtypes', [(typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__services_playlist_service__["a" /* PlaylistService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_playlist_service__["a" /* PlaylistService */]) === 'function' && _f) || Object, (typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_2__services_track_service__["a" /* TrackService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_track_service__["a" /* TrackService */]) === 'function' && _g) || Object, (typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_5__services_audio_player_service__["a" /* AudioPlayer */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__services_audio_player_service__["a" /* AudioPlayer */]) === 'function' && _h) || Object, (typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_6__utils_string_util__["a" /* StringUtil */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_6__utils_string_util__["a" /* StringUtil */]) === 'function' && _j) || Object, (typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _k) || Object, (typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]) === 'function' && _l) || Object, (typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_4__services_image_service__["a" /* ImageService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services_image_service__["a" /* ImageService */]) === 'function' && _m) || Object])
    ], AudioPlayerComponent);
    return AudioPlayerComponent;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/audio-player.component.js.map

/***/ }),

/***/ 567:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__configs_app_config__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_popup_service__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavigationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NavigationComponent = (function () {
    function NavigationComponent(appConfig, authService, router, popupService) {
        this.appConfig = appConfig;
        this.authService = authService;
        this.router = router;
        this.popupService = popupService;
    }
    NavigationComponent.prototype.ngOnInit = function () {
        this.menuItems = [
            {
                title: "Home",
                path: "/",
                permission: this.appConfig.permissions.LOGIN
            },
            {
                title: "Tracks",
                path: "/tracks",
                permission: this.appConfig.permissions.LOGIN
            },
            {
                title: "Artists",
                path: "/artists",
                permission: this.appConfig.permissions.LOGIN
            },
            {
                title: "Playlists",
                path: "/playlists",
                permission: this.appConfig.permissions.LOGIN
            },
            {
                title: "Users",
                path: "/users",
                permission: this.appConfig.permissions.MANAGE_USERS
            }
        ];
        this.menuRightItems = [
            {
                title: "Login",
                path: "/login",
                permission: this.appConfig.permissions.LOGIN
            },
            {
                title: "Change Password",
                path: "/profile/change-password",
                permission: this.appConfig.permissions.LOGIN
            }
        ];
        this.currentTab = this.menuItems[0];
    };
    NavigationComponent.prototype.changeCurrentTab = function (menuItem) {
        this.currentTab = menuItem;
    };
    NavigationComponent.prototype.logout = function () {
        var _this = this;
        this.popupService.showPopup("Log Out", "Do you want to log out ?", function () {
            _this.authService.logout().then(function (data) { return _this.router.navigate(['/']); }).catch(function (err) {
                console.log(err);
            });
            _this.popupService.hide();
        }, function () { return _this.popupService.hide(); });
    };
    NavigationComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "navigation",
            template: "\n    <nav class=\"navbar navbar-inverse\">\n    <div class=\"container\">\n    <div class=\"navbar-header\">\n        <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        </button>\n        <a class=\"navbar-brand\" href=\"/\" ng-click=\"brandClicked()\">TMusic</a>\n    </div>\n    <div id=\"navbar\" class=\"collapse navbar-collapse\">\n        <ul class=\"nav navbar-nav\">\n        <li *ngFor=\"let item of menuItems\" permission=\"{{item.permission}}\" [ngClass]=\"{'active': item === currentTab}\" (click)=\"changeCurrentTab(item)\" >\n        <a routerLink=\"{{item.path}}\" routerLinkActive=\"active\">{{item.title}}</a>\n        </li>\n        </ul>\n        <ul class=\"nav navbar-nav navbar-right\">\n    <li *ngIf=\"!authService.isAuthenticated()\" [ngClass]=\"{'active': menuRightItems[0] === currentTab}\" (click)=\"changeCurrentTab(menuRightItems[0])\"><a routerLink=\"{{menuRightItems[0].path}}\">{{menuRightItems[0].title}}</a></li>\n<li class=\"dropdown\" *ngIf=\"authService.isAuthenticated()\" [ngClass]=\"{'active': menuRightItems[1] === currentTab}\">\n    <a href=\"javascript:void(0);\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">{{authService.getUsername()}} <span class=\"caret\"></span></a>\n                <ul class=\"dropdown-menu\">\n    <li><a routerLink=\"{{menuRightItems[1].path}}\" (click)=\"changeCurrentTab(menuRightItems[1])\">Change Password</a></li>\n    <li><a href=\"javascript:void(0);\" (click)=\"logout()\">Log Out</a></li>\n                </ul>\n            </li>\n        </ul>\n    </div>\n    </div>\n    </nav>\n    ",
            styleUrls: [] }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__configs_app_config__["a" /* AppConfig */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__configs_app_config__["a" /* AppConfig */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__services_popup_service__["a" /* PopupService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services_popup_service__["a" /* PopupService */]) === 'function' && _d) || Object])
    ], NavigationComponent);
    return NavigationComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/navigation.component.js.map

/***/ }),

/***/ 568:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_pagination_model__ = __webpack_require__(216);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaginationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PaginationComponent = (function () {
    function PaginationComponent() {
        this.onSelectPage = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onPrePagination = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onNextPagination = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    PaginationComponent.prototype.invokeSelectPage = function (e) {
        this.onSelectPage.next(e);
    };
    PaginationComponent.prototype.invokePrePagination = function (e) {
        this.onPrePagination.next(e);
    };
    PaginationComponent.prototype.invokeNextPagination = function (e) {
        this.onNextPagination.next(e);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])("pagination"), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_pagination_model__["a" /* Pagination */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__models_pagination_model__["a" /* Pagination */]) === 'function' && _a) || Object)
    ], PaginationComponent.prototype, "pagination", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])("onSelectPage"), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === 'function' && _b) || Object)
    ], PaginationComponent.prototype, "onSelectPage", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])("onPrePagination"), 
        __metadata('design:type', (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === 'function' && _c) || Object)
    ], PaginationComponent.prototype, "onPrePagination", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])("onNextPagination"), 
        __metadata('design:type', (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === 'function' && _d) || Object)
    ], PaginationComponent.prototype, "onNextPagination", void 0);
    PaginationComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "pagination",
            template: "\n<nav aria-label=\"Page navigation\">\n<ul class=\"pagination\">\n<li *ngIf=\"pagination.startPage > 0\">\n<a href=\"javascript:void(0)\" aria-label=\"Previous\" (click)=\"invokePrePagination()\">\n<span aria-hidden=\"true\">&laquo;</span>\n</a>\n</li>\n<li *ngFor=\"let i of pagination.generatePageIds()\" [ngClass]=\"{'active': pagination.currentPage === i}\"><a href=\"javascript:void(0)\" (click)=\"invokeSelectPage(i)\">{{i+1}}</a></li>\n<li *ngIf=\"pagination.endPage < pagination.numOfPages - 1\">\n<a href=\"javascript:void(0)\" aria-label=\"Next\" (click)=\"invokeNextPagination()\">\n<span aria-hidden=\"true\">&raquo;</span>\n</a>\n</li>\n</ul>\n</nav>\n"
        }), 
        __metadata('design:paramtypes', [])
    ], PaginationComponent);
    return PaginationComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/pagination.component.js.map

/***/ }),

/***/ 569:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_popup_service__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopupComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PopupComponent = (function () {
    function PopupComponent(popupService) {
        this.popupService = popupService;
    }
    PopupComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "popup",
            styles: ['show { display: block !important; }'],
            template: "\n<div [ngClass]=\"{'modal fade': true, 'hidden': !popupService.isOn,'in': popupService.isOn, 'show': popupService.isOn}\" tabindex=\"-1\" role=\"dialog\">\n<div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n    <div class=\"modal-header\">\n<button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"popupService.reset()\"><span aria-hidden=\"true\" (click)=\"popupService.reset()\">&times;</span></button>\n<h4 class=\"modal-title\">{{popupService.title}}</h4>\n</div>\n<div class=\"modal-body\" [innerHtml]=\"popupService.content\">\n</div>\n<div class=\"modal-footer\">\n<button [hidden]=\"!popupService.isEnableCancel()\" type=\"button\" class=\"btn btn-default\" (click)=\"popupService.invokeCancel()\">Cancel</button>\n<button type=\"button\" class=\"btn btn-primary\" (click)=\"popupService.invokeSubmit()\">OK</button>\n</div>\n</div>\n</div>\n</div>\n"
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_popup_service__["a" /* PopupService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_popup_service__["a" /* PopupService */]) === 'function' && _a) || Object])
    ], PopupComponent);
    return PopupComponent;
    var _a;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/popup.component.js.map

/***/ }),

/***/ 570:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__configs_app_config__ = __webpack_require__(24);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPlaylistComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPlaylistComponent = (function () {
    function ListPlaylistComponent(appConfig) {
        this.appConfig = appConfig;
        this.onDeleteItem = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    ListPlaylistComponent.prototype.invokeDeleteItem = function (e) {
        this.onDeleteItem.next(e);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])("playlists"), 
        __metadata('design:type', Array)
    ], ListPlaylistComponent.prototype, "playlists", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])("onDeleteItem"), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === 'function' && _a) || Object)
    ], ListPlaylistComponent.prototype, "onDeleteItem", void 0);
    ListPlaylistComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "list-playlist",
            template: "\n    <table class=\"table\">\n    <tr>\n    <th class=\"col-sm-1 text-center\">ID</th>\n    <th class=\"col-sm-3 text-center\">Name</th>\n    <th class=\"col-sm-2 text-center\">Play Times</th>\n    <th class=\"col-sm-1 text-center\">Create Date</th>\n    <th class=\"col-sm-1 text-center\">Update</th>\n    <th class=\"col-sm-2 text-center\">Username</th>\n    <th class=\"col-sm-2\"></th>\n    </tr>\n    <tr *ngFor=\"let item of playlists\">\n    <td class=\"text-center\">{{item.id}}</td>\n    <td><a routerLink=\"/playlists/{{item.nameUnsign}}/{{item.id}}\">{{item.name}}</a></td>\n    <td class=\"text-center\">{{item.playTime}}</td>\n    <td class=\"text-center\">{{item.createdAt}}</td>\n    <td  class=\"text-center\">{{item.updatedAt}}</td>\n    <td  class=\"text-center\">{{item.username}}</td>\n    <td>\n<a routerLink=\"/playlists/{{item.nameUnsign}}/{{item.id}}\" class=\"btn btn-sm btn-info\" role=\"button\">Details</a>\n<a routerLink=\"/playlists/{{item.nameUnsign}}/{{item.id}}/edit\" class=\"btn btn-sm btn-success\" role=\"button\" >Edit</a>\n<button class=\"btn btn-sm btn-danger\" (click)=\"invokeDeleteItem(item)\" [permission]=\"appConfig.permissions.DELETE_PLAYLIST\">Delete</button>\n</td>\n</tr>\n</table>\n"
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__configs_app_config__["a" /* AppConfig */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__configs_app_config__["a" /* AppConfig */]) === 'function' && _b) || Object])
    ], ListPlaylistComponent);
    return ListPlaylistComponent;
    var _a, _b;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/list-playlist.component.js.map

/***/ }),

/***/ 571:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_playlist_model__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_string_util__ = __webpack_require__(131);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlaylistFormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PlaylistFormComponent = (function () {
    function PlaylistFormComponent(renderer, stringUtil) {
        this.renderer = renderer;
        this.stringUtil = stringUtil;
        this.playlist = new __WEBPACK_IMPORTED_MODULE_1__models_playlist_model__["a" /* Playlist */]();
        this.doSubmit = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.doCancel = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    PlaylistFormComponent.prototype.ngOnInit = function () {
        window["jQuery"](this.viewSortableList.nativeElement).sortable({
            placeholder: "ui-state-highlight"
        });
        window["jQuery"](this.viewSortableList.nativeElement).disableSelection();
    };
    PlaylistFormComponent.prototype.removeTrack = function (track) {
        var i = this.playlist.tracks.indexOf(track);
        if (i >= 0) {
            this.playlist.tracks.splice(i, 1);
        }
    };
    PlaylistFormComponent.prototype.invokeSubmit = function (e) {
        var items = this.viewSortableList.nativeElement.getElementsByTagName("li"), i = 0, n = items.length;
        this.playlist.trackIds = [];
        for (; i < n; i++) {
            this.playlist.trackIds.push(items[i].getAttribute("data-id") || items[i].getAttribute("id"));
        }
        this.doSubmit.next(e);
    };
    PlaylistFormComponent.prototype.invokeCancel = function (e) {
        this.doCancel.next(e);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])("playlist"), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_playlist_model__["a" /* Playlist */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__models_playlist_model__["a" /* Playlist */]) === 'function' && _a) || Object)
    ], PlaylistFormComponent.prototype, "playlist", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])("doSubmit"), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === 'function' && _b) || Object)
    ], PlaylistFormComponent.prototype, "doSubmit", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])("doCancel"), 
        __metadata('design:type', (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === 'function' && _c) || Object)
    ], PlaylistFormComponent.prototype, "doCancel", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("sortableList"), 
        __metadata('design:type', (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _d) || Object)
    ], PlaylistFormComponent.prototype, "viewSortableList", void 0);
    PlaylistFormComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "playlist-form",
            template: "\n<form class=\"form-horizontal\" (ngSubmit)=\"invokeSubmit()\" #myForm=\"ngForm\">\n    <div [ngClass]=\"{'has-error': !(name.valid || name.pristine), 'form-group': true}\">\n    <label for=\"name\" class=\"col-sm-2 control-label\">Name</label>\n    <div class=\"col-sm-10\">\n    <input type=\"text\" class=\"form-control\" [(ngModel)]=\"playlist.name\" #name=\"ngModel\" name=\"name\" placeholder=\"Name\" required />\n    <span class=\"help-block\" [hidden]=\"name.valid || name.pristine\">\n    {{ name.required ? \"Playlist name is required\" : \"\"}}\n    </span>\n    </div>\n    </div>\n    <div class=\"form-group\">\n    <label for=\"short-info\" class=\"col-sm-2 control-label\">Tracks</label>\n    <div class=\"col-sm-10\">\n        <ul #sortableList class=\"list-group\">\n            <li *ngFor=\"let item of playlist.tracks; let i = index\" data-id=\"{{item.id}}\" class=\"list-group-item\" data-toggle=\"tooltip\" title=\"{{item.name + '<br/>' + item.artist}}\">\n                <button type=\"button\" class=\"float-right btn-xs btn-danger\" (click)=\"removeTrack(item)\">\n                    <span class=\"glyphicon glyphicon-remove\"></span>\n                </button>\n                <span class=\"track-title\">{{i + 1}}. {{item.name }}</span>\n                <br/> <span class=\"track-artist\"> {{item.artist}}</span>\n                <span class=\"badge\">{{stringUtil.convertTime(item.length)}}</span>\n            </li>\n        </ul>\n    </div>\n    </div>\n    <div class=\"form-group\">\n    <div class=\"col-sm-offset-2 col-sm-10\">\n    <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"!myForm.valid\">Save</button>\n    <button type=\"reset\" class=\"btn btn-default\" (click)=\"invokeCancel()\">Cancel</button>\n    </div>\n    </div>\n</form>\n"
        }), 
        __metadata('design:paramtypes', [(typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__utils_string_util__["a" /* StringUtil */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__utils_string_util__["a" /* StringUtil */]) === 'function' && _f) || Object])
    ], PlaylistFormComponent);
    return PlaylistFormComponent;
    var _a, _b, _c, _d, _e, _f;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/playlist-form.component.js.map

/***/ }),

/***/ 572:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_string_util__ = __webpack_require__(131);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HitsTrackComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HitsTrackComponent = (function () {
    function HitsTrackComponent(stringUtil) {
        this.stringUtil = stringUtil;
    }
    ;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])("tracks"), 
        __metadata('design:type', Array)
    ], HitsTrackComponent.prototype, "tracks", void 0);
    HitsTrackComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "hits-track",
            template: "\n<div class=\"row\">\n    <div *ngFor=\"let track of tracks\" class=\"col-md-6 media track\">\n        <div class=\"media-left media-middle\">\n            <a routerLink=\"/{{track.nameUnsign}}/{{track.id}}\">\n                <img class=\"thumbnail media-object\" width=\"150\" height=\"150\" [src]=\"track.albumArtUrl ? track.albumArtUrl :''\" alt=\"album-art\"/>\n            </a>\n        </div>\n        <div class=\"media-body\">\n            <h4 class=\"media-heading\"><a routerLink=\"/{{track.nameUnsign}}/{{track.id}}\">{{track.name}}</a></h4>\n            <p>{{track.artist}}</p>\n            <p>\n                <span> <span class=\"glyphicon glyphicon-time\" aria-hidden=\"true\"></span> {{track.length}} </span>\n                <span> <span class=\"glyphicon glyphicon-equalizer\" aria-hidden=\"true\"></span> {{track.bitrate}} </span>\n            </p>\n            <p>\n                <span> <span class=\"glyphicon glyphicon-headphones\" aria-hidden=\"true\"></span> {{track.playTime}} </span>\n                <span> <span class=\"glyphicon glyphicon-download\" aria-hidden=\"true\"></span> {{track.downloadTime}} </span>\n            </p>\n            <p [permission]=\"'MT'\">\n                <button class=\"btn btn-default btn-info\" (click)=\"invokeAddToPlaylist(track)\" title=\"Add To Playlist\"><span class=\"glyphicon glyphicon-list-alt\" aria-hidden=\"true\"></span></button>\n                <a routerLink=\"/tracks/{{track.nameUnsign}}/{{track.id}}/edit\" class=\"btn btn-default btn-success\" role=\"button\" title=\"Edit\"><span class=\"glyphicon glyphicon-pencil\" aria-hidden=\"true\"></span></a>\n                <button class=\"btn btn-default btn-danger\" (click)=\"invokeDeleteItem(track)\" title=\"Delete\"><span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span></button>\n            </p>\n        </div>\n    </div>\n</div>\n"
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__utils_string_util__["a" /* StringUtil */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__utils_string_util__["a" /* StringUtil */]) === 'function' && _a) || Object])
    ], HitsTrackComponent);
    return HitsTrackComponent;
    var _a;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/hits-track.component.js.map

/***/ }),

/***/ 573:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_string_util__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__configs_app_config__ = __webpack_require__(24);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListTrackComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ListTrackComponent = (function () {
    function ListTrackComponent(appConfig, stringUtil) {
        this.appConfig = appConfig;
        this.stringUtil = stringUtil;
        this.flagShowControls = true;
        this.onDeleteItem = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onAddToPlaylist = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    ListTrackComponent.prototype.invokeDeleteItem = function (e) {
        this.onDeleteItem.next(e);
    };
    ListTrackComponent.prototype.invokeAddToPlaylist = function (e) {
        this.onAddToPlaylist.next(e);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])("tracks"), 
        __metadata('design:type', Array)
    ], ListTrackComponent.prototype, "tracks", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])("?controls"), 
        __metadata('design:type', Boolean)
    ], ListTrackComponent.prototype, "flagShowControls", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])("onDeleteItem"), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === 'function' && _a) || Object)
    ], ListTrackComponent.prototype, "onDeleteItem", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])("onAddToPlaylist"), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === 'function' && _b) || Object)
    ], ListTrackComponent.prototype, "onAddToPlaylist", void 0);
    ListTrackComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "list-track",
            template: "\n<div class=\"row\">\n    <div *ngFor=\"let item of tracks\" class=\"col-md-6 media track\">\n        <div class=\"media-left media-middle\">\n            <a routerLink=\"/{{item.nameUnsign}}/{{item.id}}\">\n            <img class=\"thumbnail media-object\" width=\"150\" height=\"150\" [src]=\"item.albumArtUrl ? item.albumArtUrl :''\" alt=\"album-art\"/>\n            </a>\n        </div>\n            <div class=\"media-body\">\n            <h4 class=\"media-heading\"><a routerLink=\"/{{item.nameUnsign}}/{{item.id}}\">{{item.name}}</a></h4>\n            <p>{{item.artist}}</p>\n            <p>\n            <span> <span class=\"glyphicon glyphicon-time\" aria-hidden=\"true\"></span> {{stringUtil.convertTime(item.length)}} </span>\n            <span> <span class=\"glyphicon glyphicon-equalizer\" aria-hidden=\"true\"></span> {{item.bitrate}} </span>\n            </p>\n            <p>\n            <span> <span class=\"glyphicon glyphicon-headphones\" aria-hidden=\"true\"></span> {{item.playTime}} </span>\n            <span> <span class=\"glyphicon glyphicon-download\" aria-hidden=\"true\"></span> {{item.downloadTime}} </span>\n            </p>\n            <p *ngIf = \"flagShowControls\">\n            <button [permission]=\"appConfig.permissions.UPDATE_PLAYLIST\" class=\"btn btn-default btn-info\" (click)=\"invokeAddToPlaylist(item)\" title=\"Add To Playlist\"><span class=\"glyphicon glyphicon-list-alt\" aria-hidden=\"true\"></span></button>\n            <a [permission]=\"appConfig.permissions.UPDATE_TRACK\" routerLink=\"/tracks/{{item.nameUnsign}}/{{item.id}}/edit\" class=\"btn btn-default btn-success\" role=\"button\" title=\"Edit\"><span class=\"glyphicon glyphicon-pencil\" aria-hidden=\"true\"></span></a>\n            <button [permission]=\"appConfig.permissions.DELETE_TRACK\" class=\"btn btn-default btn-danger\" (click)=\"invokeDeleteItem(item)\" title=\"Delete\"><span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span></button>\n            </p>\n        </div>\n    </div>\n</div>\n"
        }), 
        __metadata('design:paramtypes', [(typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__configs_app_config__["a" /* AppConfig */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__configs_app_config__["a" /* AppConfig */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__utils_string_util__["a" /* StringUtil */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__utils_string_util__["a" /* StringUtil */]) === 'function' && _d) || Object])
    ], ListTrackComponent);
    return ListTrackComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/list-track.component.js.map

/***/ }),

/***/ 574:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_track_dto__ = __webpack_require__(368);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrackFormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TrackFormComponent = (function () {
    function TrackFormComponent(renderer) {
        this.renderer = renderer;
        this.track = new __WEBPACK_IMPORTED_MODULE_1__models_track_dto__["a" /* TrackDto */]();
        this.doSubmit = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.doCancel = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.fileError = null;
    }
    TrackFormComponent.prototype.invokeSubmit = function (e) {
        if (!this.flagGetFile) {
            this.track.path = null;
        }
        this.doSubmit.next(e);
    };
    TrackFormComponent.prototype.invokeCancel = function (e) {
        this.doCancel.next(e);
    };
    TrackFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        window.setTimeout(function () {
            window["jQuery"](_this.viewSelectBox1.nativeElement).select2().on('change', function (e) {
                var item, i, n = _this.viewSelectBox1.nativeElement.options.length, values = [];
                for (i = 0; i < n; i++) {
                    item = _this.viewSelectBox1.nativeElement.options[i];
                    if (item.selected) {
                        values.push(item.value.split("'")[1]);
                    }
                }
                //console.log(values);
                _this.track.artistIds = values;
            });
            window["jQuery"](_this.viewSelectBox2.nativeElement).select2().on('change', function (e) {
                var value = _this.viewSelectBox2.nativeElement.value;
                //console.log(value);
                _this.track.genreId = value;
            });
        }, 200);
        this.flagGetFile = false;
    };
    TrackFormComponent.prototype.checkFile = function (mp3File) {
        var files = mp3File.files;
        if (!files || files.length < 1) {
            this.fileError = 'No file selected';
        }
        else {
            this.track.file = files[0];
            if (this.track.file.type.toLowerCase().indexOf('audio/') === -1) {
                this.fileError = 'File is not audio/mp3';
            }
            else if (this.track.file.size > 512 * 1024 * 1024) {
                this.fileError = 'File is too large. Max size is 512MB';
            }
            else {
                this.fileError = null;
            }
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])("track"), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_track_dto__["a" /* TrackDto */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__models_track_dto__["a" /* TrackDto */]) === 'function' && _a) || Object)
    ], TrackFormComponent.prototype, "track", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])("artists"), 
        __metadata('design:type', Array)
    ], TrackFormComponent.prototype, "artists", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])("genres"), 
        __metadata('design:type', Array)
    ], TrackFormComponent.prototype, "genres", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])("doSubmit"), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === 'function' && _b) || Object)
    ], TrackFormComponent.prototype, "doSubmit", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])("doCancel"), 
        __metadata('design:type', (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === 'function' && _c) || Object)
    ], TrackFormComponent.prototype, "doCancel", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("selectBox1"), 
        __metadata('design:type', (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _d) || Object)
    ], TrackFormComponent.prototype, "viewSelectBox1", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("selectBox2"), 
        __metadata('design:type', (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _e) || Object)
    ], TrackFormComponent.prototype, "viewSelectBox2", void 0);
    TrackFormComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "track-form",
            template: "\n<form class=\"form-horizontal\" (ngSubmit)=\"invokeSubmit()\" #myForm=\"ngForm\">\n    <div *ngIf=\"!track.id\" class=\"form-group\">\n    <div class=\"col-sm-offset-2 col-sm-10\">\n        <input type=\"checkbox\" [(ngModel)]=\"flagGetFile\" name=\"flagGetFile\" />\n        Get file from URL\n    </div>\n    </div>\n<div *ngIf=\"!track.id && !flagGetFile\" class=\"form-group\" [ngClass]=\"{'has-error': fileError != null}\">\n        <label for=\"file\" class=\"col-sm-2 control-label\">Mp3 File</label>\n        <div class=\"col-sm-10\">\n<input #mp3File name=\"file\" type=\"file\" (change)=\"checkFile(mp3File)\" required/>\n            <span class=\"help-block\">\n            {{fileError}}\n            </span>\n        </div>\n    </div>\n<div *ngIf=\"!track.id && flagGetFile\"  [ngClass]=\"{'has-error': !(path.valid || path.pristine), 'form-group': true}\">\n        <label for=\"path\" class=\"col-sm-2 control-label\">Mp3 URL</label>\n        <div class=\"col-sm-10\">\n            <input type=\"text\" class=\"form-control\" [(ngModel)]=\"track.path\" #path=\"ngModel\" name=\"path\" placeholder=\"Mp3 URL\" required />\n            <span class=\"help-block\" [hidden]=\"path.valid || path.pristine\">\n            {{ name.required ? \"Mp3 URL is required\" : \"\"}}\n            </span>\n        </div>\n    </div>\n    <div [ngClass]=\"{'has-error': !(name.valid || name.pristine), 'form-group': true}\">\n        <label for=\"name\" class=\"col-sm-2 control-label\">Title</label>\n        <div class=\"col-sm-10\">\n            <input type=\"text\" class=\"form-control\" [(ngModel)]=\"track.name\" #name=\"ngModel\" name=\"track-name\" placeholder=\"Name\" required />\n            <span class=\"help-block\" [hidden]=\"name.valid || name.pristine\">\n            {{ name.required ? \"Track name is required\" : \"\"}}\n            </span>\n        </div>\n    </div>\n    <div class=\"form-group\">\n        <label for=\"author\" class=\"col-sm-2 control-label\">Artist</label>\n        <div class=\"col-sm-10\">\n<select #selectBox1 class=\"form-control\" [(ngModel)]=\"track.artistIds\" name=\"artists\" multiple=\"true\" >\n            <option *ngFor=\"let a of artists\" value=\"{{a.id}}\">{{a.name}}</option>\n        </select>\n        </div>\n    </div>\n    <div class=\"form-group\">\n        <label for=\"category\" class=\"col-sm-2 control-label\">Genre</label>\n        <div class=\"col-sm-10\">\n<select #selectBox2 class=\"form-control\" [(ngModel)]=\"track.genreId\" name=\"genre\">\n                <option *ngFor=\"let g of genres\" value=\"{{g.id}}\">{{g.name}}</option>\n            </select>\n        </div>\n    </div>\n    <div class=\"form-group\">\n        <div class=\"col-sm-offset-2 col-sm-10\">\n        <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"!myForm.valid\">Save</button>\n        <button type=\"reset\" class=\"btn btn-default\" (click)=\"invokeCancel()\">Cancel</button>\n        </div>\n    </div>\n</form>\n"
        }), 
        __metadata('design:paramtypes', [(typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]) === 'function' && _f) || Object])
    ], TrackFormComponent);
    return TrackFormComponent;
    var _a, _b, _c, _d, _e, _f;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/track-form.component.js.map

/***/ }),

/***/ 575:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_track_playlists_dto__ = __webpack_require__(458);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrackToPlaylistComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TrackToPlaylistComponent = (function () {
    function TrackToPlaylistComponent(renderer) {
        this.renderer = renderer;
        this.doSubmit = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.doCancel = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    TrackToPlaylistComponent.prototype.invokeSubmit = function (e) {
        this.doSubmit.next(e);
    };
    TrackToPlaylistComponent.prototype.invokeCancel = function (e) {
        this.doCancel.next(e);
    };
    TrackToPlaylistComponent.prototype.ngOnInit = function () {
        //window["jQuery"](this.viewSelectBox.nativeElement).select2();
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])("model"), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_track_playlists_dto__["a" /* TrackPlaylistsDto */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__models_track_playlists_dto__["a" /* TrackPlaylistsDto */]) === 'function' && _a) || Object)
    ], TrackToPlaylistComponent.prototype, "model", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])("myPlaylists"), 
        __metadata('design:type', Array)
    ], TrackToPlaylistComponent.prototype, "myPlaylists", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])("doSubmit"), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === 'function' && _b) || Object)
    ], TrackToPlaylistComponent.prototype, "doSubmit", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])("doCancel"), 
        __metadata('design:type', (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === 'function' && _c) || Object)
    ], TrackToPlaylistComponent.prototype, "doCancel", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("selectBox"), 
        __metadata('design:type', (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _d) || Object)
    ], TrackToPlaylistComponent.prototype, "viewSelectBox", void 0);
    TrackToPlaylistComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "track-to-playlist",
            template: "\n<form class=\"form-horizontal\" (ngSubmit)=\"invokeSubmit()\" #myForm=\"ngForm\">\n<div class=\"form-group\">\n<label for=\"name\" class=\"col-sm-2 control-label\">Title</label>\n<div class=\"col-sm-10\">\n{{model.name}}\n</div>\n</div>\n<div class=\"form-group\">\n<label for=\"artists\" class=\"col-sm-2 control-label\">Artist</label>\n<div class=\"col-sm-10\">\n{{model.artist}}\n</div>\n</div>\n<div class=\"form-group\">\n<label for=\"playlists\" class=\"col-sm-2 control-label\">Select Playlists</label>\n<div class=\"col-sm-10\">\n<select #selectBox class=\"form-control\" [(ngModel)]=\"model.playlistIds\" name=\"playlistIds\" multiple=\"true\">\n<option *ngFor=\"let p of myPlaylists\" value=\"{{p.id}}\">{{p.name}}</option>\n</select>\n</div>\n</div>\n<div class=\"form-group\">\n<div class=\"col-sm-offset-2 col-sm-10\">\n<button type=\"submit\" class=\"btn btn-success\" [disabled]=\"!myForm.valid\">Save</button>\n<button type=\"reset\" class=\"btn btn-default\" (click)=\"invokeCancel()\">Cancel</button>\n</div>\n</div>\n</form>\n"
        }), 
        __metadata('design:paramtypes', [(typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]) === 'function' && _e) || Object])
    ], TrackToPlaylistComponent);
    return TrackToPlaylistComponent;
    var _a, _b, _c, _d, _e;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/track-to-playlist.component.js.map

/***/ }),

/***/ 576:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_user_model__ = __webpack_require__(369);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoginComponent = (function () {
    function LoginComponent() {
        this.user = new __WEBPACK_IMPORTED_MODULE_1__models_user_model__["a" /* User */]();
        this.serverErrors = {};
        this.doSubmit = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.doCancel = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    LoginComponent.prototype.invokeSubmit = function (e) {
        this.doSubmit.next(e);
    };
    LoginComponent.prototype.invokeCancel = function (e) {
        this.doCancel.next(e);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])("user"), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_user_model__["a" /* User */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__models_user_model__["a" /* User */]) === 'function' && _a) || Object)
    ], LoginComponent.prototype, "user", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])("serverErrors"), 
        __metadata('design:type', Object)
    ], LoginComponent.prototype, "serverErrors", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])("doSubmit"), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === 'function' && _b) || Object)
    ], LoginComponent.prototype, "doSubmit", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])("doCancel"), 
        __metadata('design:type', (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === 'function' && _c) || Object)
    ], LoginComponent.prototype, "doCancel", void 0);
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "login",
            template: "\n<form class=\"form-horizontal\" (ngSubmit)=\"invokeSubmit()\" #myForm=\"ngForm\">\n    <div [ngClass]=\"{'has-error': !(username.valid || username.pristine) || serverErrors.username, 'form-group': true}\">\n        <label for=\"username\" class=\"col-sm-2 control-label\">Username</label>\n        <div class=\"col-sm-10\">\n            <input type=\"text\" class=\"form-control\" [(ngModel)]=\"user.username\" name=\"username\" #username=\"ngModel\" placeholder=\"Username\"\n            required\n            minlength=\"5\" maxlength=\"32\"\n            />\n            <span class=\"help-block\" [hidden]=\"username.valid || username.pristine\">\n                {{ username.errors ? \n                    username.errors.required ? 'Username is required' :\n                    username.errors.minlength ? 'Min length is 5' :\n                    username.errors.maxlength ? 'Max length is 32' :\n                    '' : ''\n                }}\n            </span>\n            <span class=\"help-block\" [hidden]=\"!serverErrors.username\">\n                {{ serverErrors.username }}\n            </span>\n        </div>\n    </div>\n    <div [ngClass]=\"{'has-error': !(password.valid || password.pristine) || serverErrors.password, 'form-group': true}\">\n        <label for=\"password\" class=\"col-sm-2 control-label\">Password</label>\n        <div class=\"col-sm-10\">\n            <input type=\"password\" class=\"form-control\" [(ngModel)]=\"user.password\" name=\"password\" #password=\"ngModel\" placeholder=\"Password\"\n            required\n            minlength=\"5\" maxlength=\"32\"\n            />\n            <span class=\"help-block\" [hidden]=\"password.valid || password.pristine\">\n                {{ password.errors ? \n                    password.errors.required ? 'Password is required' :\n                    password.errors.minlength ? 'Min length is 5' :\n                    password.errors.maxlength ? 'Max length is 32' :\n                    '' : ''\n                }}\n            </span>\n            <span class=\"help-block\" [hidden]=\"!serverErrors.password\">\n                {{ serverErrors.password }}\n            </span>\n        </div>\n    </div>\n    <div class=\"form-group\">\n        <div class=\"col-sm-offset-2 col-sm-10\">\n            <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"!myForm.valid\">Login</button>\n            <button type=\"reset\" class=\"btn btn-default\" (click)=\"invokeCancel()\">Cancel</button>\n        </div>\n    </div>\n</form>\n"
        }), 
        __metadata('design:paramtypes', [])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/login.component.js.map

/***/ }),

/***/ 577:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(144);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PermissionDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PermissionDirective = (function () {
    function PermissionDirective(el, renderer, authService) {
        this.el = el;
        this.renderer = renderer;
        this.authService = authService;
    }
    PermissionDirective.prototype.ngOnInit = function () {
        if (this.authService.checkPermission(this.permission) === false) {
            //            this.renderer.setElementStyle(this.el.nativeElement, "display", "none");
            var elem = this.el.nativeElement;
            elem.parentNode.removeChild(elem);
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])("permission"), 
        __metadata('design:type', String)
    ], PermissionDirective.prototype, "permission", void 0);
    PermissionDirective = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: "[permission]"
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _c) || Object])
    ], PermissionDirective);
    return PermissionDirective;
    var _a, _b, _c;
}());
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/permission.directive.js.map

/***/ }),

/***/ 578:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_model__ = __webpack_require__(254);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Track; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var Track = (function (_super) {
    __extends(Track, _super);
    function Track() {
        _super.apply(this, arguments);
    }
    return Track;
}(__WEBPACK_IMPORTED_MODULE_0__entity_model__["a" /* Entity */]));
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/track.model.js.map

/***/ }),

/***/ 579:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/environment.js.map

/***/ }),

/***/ 738:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 739:
/***/ (function(module, exports) {

module.exports = "<navigation></navigation>\n<div class=\"container\">\n  <router-outlet></router-outlet>\n  <audio-player></audio-player>\n  <popup></popup>\n</div>"

/***/ }),

/***/ 785:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(507);


/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_hit_list_model__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__configs_app_config__ = __webpack_require__(24);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrackService; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TrackService = (function (_super) {
    __extends(TrackService, _super);
    function TrackService(http, appConfig) {
        _super.call(this, http, appConfig.serviceApiUrl + "/api/v1/tracks/");
        this.appConfig = appConfig;
        //cache tracks src
        this.myCache = new Map();
    }
    /**
     * Query track
     * @param {number} page
     * @param {number} size
     * @param {string} q - srearch term
     * @param {string} order - field1:asc,field2:desc,...
     */
    TrackService.prototype.query = function (page, size, q, order) {
        if (page === void 0) { page = 0; }
        var url = this.apiUrl + "?page=" + page;
        if (typeof size === "number") {
            url += "&size=" + size;
        }
        if (typeof q === "string") {
            url += "&q=" + q;
        }
        if (typeof order === "string") {
            url += "&order=" + order;
        }
        return this.http.get(url)
            .toPromise()
            .then(function (response) {
            var data = JSON.parse(response["_body"]);
            return new __WEBPACK_IMPORTED_MODULE_2__models_hit_list_model__["a" /* HitList */](data);
        })
            .catch(this.handleError);
    };
    /**
     * Get track source by file id
     * @param {string} fileId - google file id
     */
    TrackService.prototype.getTrackSource = function (fileId) {
        var _this = this;
        if (this.myCache.has(fileId)) {
            return Promise.resolve(this.myCache.get(fileId));
        }
        return this.http.get(this.appConfig.serviceApiUrl + "/api/v1/files/redirect-link?url=https://drive.google.com/uc?id=" + fileId + "&export=download")
            .toPromise()
            .then(function (response) {
            var data = JSON.parse(response["_body"]);
            _this.myCache.set(fileId, data["redirectUrl"]);
            return data["redirectUrl"];
        })
            .catch(this.handleError);
    };
    TrackService.prototype.upview = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append("Content-Type", "application/json");
        return this.http.put(this.apiUrl + id + "/upview", "", { headers: headers })
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    TrackService.prototype.upload = function (trackDto) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        var fd = new FormData();
        fd.append('file', trackDto.file);
        fd.append('name', trackDto.name);
        fd.append('artistIds', trackDto.artistIds);
        fd.append('genreId', trackDto.genreId);
        fd.append('lyric', trackDto.lyric);
        return this.http
            .post(this.apiUrl + "upload", fd, { headers: headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    TrackService.prototype.saveFromUrl = function (trackDto) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ "Content-Type": "application/json" });
        headers.append("XToken", localStorage.getItem("token"));
        return this.http
            .post(this.apiUrl + "fetch-from-url", JSON.stringify(trackDto), { headers: headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    TrackService.prototype.update = function (trackDto) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ "Content-Type": "application/json" });
        headers.append("XToken", localStorage.getItem("token"));
        return this.http
            .put(this.apiUrl, JSON.stringify(trackDto), { headers: headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    TrackService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__configs_app_config__["a" /* AppConfig */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__configs_app_config__["a" /* AppConfig */]) === 'function' && _b) || Object])
    ], TrackService);
    return TrackService;
    var _a, _b;
}(__WEBPACK_IMPORTED_MODULE_3__service__["a" /* Service */]));
//# sourceMappingURL=D:/MyProjects/tmusic-client/src/track.service.js.map

/***/ })

},[785]);
//# sourceMappingURL=main.bundle.map