"use strict";

function table({tableSelector}) {
    const table = document.querySelector(tableSelector),
          allTdTable = table.querySelectorAll("tbody > tr:nth-child(1) > td"),
          allThTable = table.querySelectorAll("thead > tr > th"),
          fixedSelectorHeadTR = table.querySelector("thead > tr"),
          fixedSelectorBodyTR = table.querySelectorAll("tbody > tr");

    function fixedHeaderTable() {
        let width = [];
        for (let i = 0; i < allThTable.length; i++) {
            let widthTd = getComputedStyle(allTdTable[i]).width.replace(/px/g, '');
            let widthTh = getComputedStyle(allThTable[i]).width.replace(/px/g, '');
            width.push((widthTd > widthTh) ?  widthTd : widthTh);
            let widthHeader = (widthTd > widthTh) ?  widthTd : widthTh;
            allThTable[i].style.width = `${widthHeader}px`;
            allThTable[i].style.backgroundColor = '#fff';
            allThTable[i].style.color = '#212528';
        }
        setOrDelCssSelector(width, 'flex', '42px');
    }
    function cleardisplay() {
        for (let i = 0; i < allThTable.length; i++) {
            allThTable[i].style.width = '';
            allThTable[i].style.backgroundColor = '';
            allThTable[i].style.color = '';
        }
        setOrDelCssSelector('', '', '');
    }
    function setOrDelCssSelector(widthArr, flex, px) {
        fixedSelectorBodyTR.forEach(element => {
            element.style.display = flex;
            for (let i = 0; i < element.children.length; i++) {
                element.children[i].style.width = (widthArr === '') ? '' : `${widthArr[i]}px`;
            }
        });
        fixedSelectorHeadTR.parentElement.style.display = flex;
        fixedSelectorHeadTR.parentElement.style.height = px;
        fixedSelectorHeadTR.style.display = flex;
    }

    fixedHeaderTable();
    window.addEventListener('resize', () => {
        cleardisplay();
        fixedHeaderTable();
    });
    window.addEventListener('scroll', ()=>{
        if (window.pageYOffset > table.offsetTop) {
            fixedSelectorHeadTR.style.top = '0';
            fixedSelectorHeadTR.style.position = 'fixed';
        } else {
            fixedSelectorHeadTR.style.top = '';
            fixedSelectorHeadTR.style.position = '';
        }
    });
}

try{
table({
    tableSelector: "#fixedTable"
});
}catch (e){
    console.error(e);
}