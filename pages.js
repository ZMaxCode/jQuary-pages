var jq = jQuery.noConflict();

var HeadBlockStyle = {
    "display" : "flex",
    "text-align" : "center",
}

var NotActivePageStyle = {
    "flex" : "1",
    "font-size" : "1.7vw",
    "background" : "white",
    "transition" : "0.3s",
    "cursor" : "default"
}

var ActivePageStyle = {
    "background" : "#bbbbbb"
}

var HoverPageStyle = {
    "cursor" : "pointer",
    "background" : "#dddddd"
}

function createPagesHead(){
    var prevPage;

    var pageHeadBlock = jq(".pagesHead");
    var prevPage = new Array(pageHeadBlock.length).fill(0);

    pageHeadBlock.css(HeadBlockStyle);

    for(let i = 0; i < pageHeadBlock.length; i++){

        let pages = pageHeadBlock.eq(i).attr("pagesNames").split(" ");
        let block = pageHeadBlock.eq(i).attr("blockName");
        let childrenBlock = jq("." + block).children();

        childrenBlock.hide();
        childrenBlock.eq(0).show();

        for(let j = 0; j < pages.length; j++){

            let page = jq("<div/>").text(pages[j]).attr("class", "page" + i);
            pageHeadBlock.eq(i).append(page);
            page.css(NotActivePageStyle)
            if(j === 0) page.css(ActivePageStyle)

        }

        let page = jq(".page" + i);

        for(let j = 0; j < page.length; j++){
            page.eq(j).on("click", () => {

                if(j !== prevPage[i]){
                    childrenBlock.eq(j).show();
                    childrenBlock.eq(prevPage[i]).hide();
                    page.eq(j).css(ActivePageStyle);
                    page.eq(prevPage[i]).css(NotActivePageStyle);
                    prevPage[i] = j;
                }

            })

            page.eq(j).hover(
                function(){
                    page.eq(j).css(HoverPageStyle)
                },
                function(){
                    if(j !== prevPage[i]) page.eq(j).css(NotActivePageStyle)
                    else page.eq(j).css(ActivePageStyle);
                }
            )

        }
            
    }
}

jq(document).ready(() => {
    createPagesHead();
});