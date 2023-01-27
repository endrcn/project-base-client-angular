import { environment } from '../environments/environment';
import { Injectable } from "@angular/core";

declare var $: any;
@Injectable()
export class Globals {

  url: string = environment.url;
  static url: string = environment.url; // app.module.ts te kullanılabilmesi için eklendi.
  version: string = "v1.0.0";


  loadTooltipFunctionality() {
    // tooltip kullanılan sayfalarda AfterViewChecked event'ında çalıştırılmalı!
    if ($('[data-bs-toggle="tooltip"]') && typeof $('[data-bs-toggle="tooltip"]').tooltip === "function") {
      $('[data-bs-toggle="tooltip"]').tooltip({
        trigger: 'hover',
        html: true
      });
    }

  }

  updateTooltip() {
    $('[data-bs-toggle="tooltip"]').tooltip('destroy');
  }

  isJSON(data: any) {
    try {
      JSON.parse(data);
      return true;
    } catch (error) {
      return false;
    }
  }

  getInterfaceLang() {
    let lang = localStorage["language"];
    return lang;
  }

  getDateRangePickerLocale() {
    return {
      format: 'DD.MM.YYYY',
      "applyLabel": "Uygula",
      "cancelLabel": "Vazgeç",
      "daysOfWeek": [
        "Pt",
        "Sl",
        "Çr",
        "Pr",
        "Cm",
        "Ct",
        "Pz"
      ],
      "monthNames": [
        "Ocak",
        "Şubat",
        "Mart",
        "Nisan",
        "Mayıs",
        "Haziran",
        "Temmuz",
        "Ağustos",
        "Eylül",
        "Ekim",
        "Kasım",
        "Aralık"
      ],
      "firstDay": 0
    }
  }

  addReversableDropdown() {
    $(".dropdown-toggle").on("click", () => {
      var $parent = $(this).parent();
      // get the scollTop (distance scrolled from top)
      var scrollTop = $(window).scrollTop();
      // get the top offset of the dropdown (distance from top of the page)
      var topOffset = $parent.offset().top;
      // calculate the dropdown offset relative to window position
      var relativeOffset = topOffset - scrollTop;
      // get the window height
      var windowHeight = $(window).height();

      // if the relative offset is greater than half the window height,
      // reverse the dropdown.
      // console.log(relativeOffset, relativeOffset > windowHeight / 1.5);
      if (relativeOffset > windowHeight / 1.8) {
        $(".dropdown-menu").addClass("reverse");
      }
      else {
        $(".dropdown-menu").removeClass("reverse");
      }
    });
  }

  keyPressAlphaNumeric(event: any) {

    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z0-9_]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  /**
     * Converts words of sentence to Lower Case
     * @param {String} text
     * @returns Converted text
     */
  toLowerCase(text: String) {
    var bigChars = ["A", "B", "C", "Ç", "D", "E", "F", "G", "Ğ", "H", "I", "İ", "J", "K", "L", "M", "N", "O", "Ö", "P", "R", "S", "Ş", "T", "U", "Ü", "V", "Y", "Z", "X", "Q", "W"];
    var lowChars = ["a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "r", "s", "ş", "t", "u", "ü", "v", "y", "z", "x", "q", "w"];

    for (var i = 0; i < bigChars.length; i++) {
      text = text.replace(new RegExp(bigChars[i], "g"), lowChars[i]);
    }

    return text.toLocaleLowerCase("tr");
  }

  formatDate(date: Date) {
    let strDate = date.getFullYear() + "-" + this.putZero(date.getMonth() + 1) + "-" + this.putZero(date.getDate()) + " " + this.putZero(date.getHours()) + ":" + this.putZero(date.getMinutes()) + ":" + this.putZero(date.getSeconds());
    return strDate;
  }

  putZero(val: Number) {
    if (val < 10) {
      return "0" + val;
    }
    return val;
  }

  sanitize(text: any) {
    let map: any = {
      "Ç": "c",
      "ç": "c",
      "Ş": "s",
      "ş": "s",
      "Ö": "o",
      "ö": "o",
      "Ü": "u",
      "ü": "u",
      "İ": "i",
      "ı": "i",
      "Ğ": "g",
      "ğ": "g",
      "I": "i"
    }
    return (text || "").replace(/(.)/g, (input: any, a: any) => {
      return map[a] || a;
    }).replace(/[^a-zA-Z0-9]/g, "").toLocaleLowerCase("tr");
  }

}
