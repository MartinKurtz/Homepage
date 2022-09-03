var intervale = setInterval(function(){checkDates()}, 1000)
const listPopups = []

function openArticle(article, author, date){
   let finalTitle = document.getElementById("title" + article).textContent
   let header = document.getElementById("TitleHeader")
   header.textContent = finalTitle
   let closeButton = document.getElementById("close")
   closeButton.classList.add("invisible")
   let newButton = document.getElementById("new")
   newButton.textContent = "<"
    newButton.classList.add("backButton")
    newButton.onclick = closeArticle
    let articles = document.getElementById("articles")
    articles.classList.add("absolute", "invisible")
    let articleText = document.getElementById("articleText")
    articleText.classList.add("articleTextShown")
    let haken = document.getElementById("haken" + article)
    haken.textContent = "\u2713"
    haken.style.color = "green"
    let authorHeader = document.getElementById("authorHeader")
    authorHeader.classList.add("authorHeaderVisible")
    authorHeader.textContent = author
    let dateEl = document.getElementById("closeDate")
    dateEl.classList.add("closeDateVisible")
    dateEl.textContent = formatDate(date)
}

function closeArticle(){
    let closeButton = document.getElementById("close")
    closeButton.classList.remove("invisible")
    let newButton = document.getElementById("new")
    newButton.classList.remove("backButton")
    newButton.textContent = "+"
    newButton.onclick = openAdd
    let header = document.getElementById("TitleHeader")
   header.textContent = "Papers"
   let articles = document.getElementById("articles")
    articles.classList.remove("absolute", "invisible")
    let articleText = document.getElementById("articleText")
    articleText.classList.remove("articleTextShown")
    let authorHeader = document.getElementById("authorHeader")
    authorHeader.classList.remove("authorHeaderVisible")
    authorHeader.textContent = ""
    let dateEl = document.getElementById("closeDate")
    dateEl.classList.remove("closeDateVisible")
    dateEl.textContent = ""
}

function openAdd(){
    var addPopup = document.getElementById("popup2")
    addPopup.classList.add("open-popup2")
}
function closeAdd(){
    var addPopup = document.getElementById("popup2")
    var titleText = document.getElementById("titleInput").value
    var authorText = document.getElementById("authorInput").value
    var date = new Date(document.getElementById("dateInput").value)
    document.getElementById("dateInput").value = ""
    document.getElementById("authorInput").value = ""
    document.getElementById("titleInput").value = ""
    createNewElement(titleText, authorText, date)
    addPopup.classList.remove("open-popup2")
}


function getCurrentDate(){
    return formatDate(new Date());

}

function checkDates(){
    let list = document.querySelectorAll("#articles > li")
    list.forEach(function(el){
        let title = el.id
        let date = new Date(document.getElementById("date" + title).textContent)
        if(date.getTime() < new Date().getTime() && !listPopups.includes(title)){
            openRemember(title, date)
            let dateEl = document.getElementById("date" + title)
            dateEl.style.color = "red"
            listPopups.push(title)
        }
    })
}

function formatDate(date){
    var month = ""
    if(date.getMonth() + 1 < 10){
        month = "0" + (date.getMonth() + 1)
    }else{
        month = (date.getMonth() + 1)
    }
    var day = ""
    if(date.getDate() < 10){
        day = '0' + date.getDate()
    }else{
        day = date.getDate()
    }
    var date = day + '.' + month + '.' + date.getFullYear();
    return date
}

function pressCloseButton(){
    let deletePopup = document.getElementById("popup3")
    deletePopup.classList.add("popup3Visible")
}

function clickDelete(){
    let title = document.getElementById("deleteInput").value
    document.getElementById("deleteInput").value = ""
    title = title.replace(/ /g, "");
    deleteElement(title)
    closeDeletePopup()
}

function closeDeletePopup(){
    let deletePopup = document.getElementById("popup3")
    deletePopup.classList.remove("popup3Visible")
}

function deleteElement(title){
    title = title.replace(/ /g, "");
    console.log(title)
    removeItemOnce(listPopups, title)
    let list = document.querySelectorAll("#articles > li")
    list.forEach(function(el){
        console.log(el.id)
        if(el.id == title){
            console.log("bis hier hin")
            document.getElementById("articles").removeChild(el)
        }
    })
}

 function openRemember(title, date){
    let popup = document.getElementById("popup")
    let author = document.getElementById("caption" + title).textContent
    let zumArtikel = document.getElementById("zumArtikel")
    zumArtikel.onclick = function(){openArticle(title, author, date)}
    let popupText = document.querySelector('.popupText')
    popupText.textContent = "Die Lesezeit f\u00fcr den Artikel " + title + " wurde \u00fcberschritten"
    popup.classList.add("open-popup")
 }
 function closePopup(){
    var popup = document.getElementById("popup")
    popup.classList.remove("open-popup")
 }

 function createNewElement(titleText, author, date){
    let titleTextNoSpaces = titleText.replace(/ /g, "");
    var li = document.createElement("li");
    li.id = titleTextNoSpaces
    var table = document.createElement("table")
    table.id = "content" + titleTextNoSpaces
    table.classList.add("content")
    table.localName = title
    var title = document.createElement("p")
    title.id = "title" + titleTextNoSpaces
    title.classList.add("title")
    title.textContent = titleText
    var caption = document.createElement("p")
    caption.id = "caption" + titleTextNoSpaces
    caption.classList.add("caption")
    caption.textContent = author
    var td = document.createElement("td")
    td.id = "contentTitle" + titleTextNoSpaces
    td.classList.add("contentTitle")
    td.onclick = function(){openArticle(titleTextNoSpaces, author, date)}
    td.appendChild(title)
    td.appendChild(caption)
    var tr = document.createElement("tr")
    tr.appendChild(td)
    td = document.createElement("td")
    td.id = "contentOther" + titleTextNoSpaces
    td.classList.add("contentOther")
    var table2 = document.createElement("table")
    table2.id = "content2" + titleTextNoSpaces
    table2.classList.add("content2")
    var tr2 = document.createElement("tr")
    var td1 = document.createElement("td")
    td1.id = "haken" + titleTextNoSpaces
    td1.classList.add("haken")
    td1.textContent = "\u2717"
    tr2.appendChild(td1)
    var tr3 = document.createElement("tr")
    var td2 = document.createElement("td")
    td2.id = "date" + titleTextNoSpaces
    td2.classList.add("date")
    td2.textContent = formatDate(date)
    tr3.appendChild(td2)
    table2.appendChild(tr2)
    table2.appendChild(tr3)
    td.appendChild(table2)
    tr.appendChild(td)
    table.appendChild(tr)
    li.appendChild(table)
    var ul = document.getElementById("articles")
    ul.appendChild(li)

 }

 function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

