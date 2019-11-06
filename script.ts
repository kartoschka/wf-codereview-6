interface HTMLifiable {
  html(): HTMLElement
}

// location: [<spot>, <area>, <wider area>]. eg. [<street>, <town>, <country>]
// description: array of strings ~~ list of paragraphs
abstract class SiteOfInterest implements HTMLifiable {
  constructor(protected name: string,
              protected location: [string,string,string] = [null,null,null],
              protected description: string[] = [],
              protected img="") { }

  html() {
    let htmlobj = document.createElement("div")
    htmlobj.className = "item"
    htmlobj.innerHTML = `
      <div class=item-imgbox><img class=item-img src=${this.img}></div>
      <h2 class=item-title>${this.name}</h2>
      <div class=item-subtitle>${this.location.filter(x=>x).join("/")}</div>
      ${this.pre_text()}
      <div class=item-text>${this.ary2pstr(this.description)}</div>
    `
    return htmlobj
  }

  pre_text() { return "" }

  ary2pstr(a) {
    return a.map(el => `<p>${el}</p>`).join("\n")
  }
}

class Place extends SiteOfInterest {
  constructor(protected type: string, p1,p2?,p3?,p4?) { super(p1,p2,p3,p4) }

  pre_text() {
    return `
      <ul class=item-proplist>
        <li>Kind of place: ${this.type}</li>
      </ul>
    `
  }
}

class Restaurant extends SiteOfInterest {
  constructor(protected cuisine: string,
              protected phone: string,
              protected priceRange: string,
              p1,p2?,p3?,p4?) { super(p1,p2,p3,p4) }

  pre_text() {
    return `
      <ul class=item-proplist>
        <li>Cuisine: ${this.cuisine}</li>
        <li>Phone: ${this.phone}</li>
        <li>Price range: ${this.priceRange}</li>
      </ul>
    `
  }
}

// expects date and time in free string format b/c no further data manipulation
// required.
class EventSite extends SiteOfInterest {
  constructor(protected date: string,
              protected time: string,
              protected duration: string,
              protected price: number,
              p1,p2?,p3?,p4?) { super(p1,p2,p3,p4) }

  pre_text() {
    return `
      <ul class=item-proplist>
        <li>Date: ${this.date}</li>
        <li>Time: ${this.time}</li>
        <li>Duration: ${this.duration}</li>
        <li>Admission: ${this.price} EUR</li>
      </ul>
    `
  }
}

class GridWriter {
  static write(objs: HTMLifiable[], root: HTMLElement = document.body,
               target?: HTMLElement) {
    if(!target) { 
      target = document.createElement("div")
      target.className = "grid"
    }
    objs.forEach(o => target.appendChild(o.html()))
    root.appendChild(target)
  }
}
