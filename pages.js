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
        let blockStyle = pageHeadBlock.eq(i).attr("changeBlockStyle").split(" ");
        let verticalOrHorisontalTab = pageHeadBlock.eq(i).attr("verticalOrHorisontalTab");
        let childrenBlock = jq("." + block).children();

        switch( blockStyle[0] ){
            case "listX" : 
                jq("." + block).css("overflow-x", "hidden");
                childrenBlock.wrapAll("<div class = \"listBlock" + i + "\"/>")
                            .css("display", "inline-block");
                jq(".listBlock" + i).css({
                    "white-space" : "nowrap",
                    "transition-duration" : blockStyle[1]
                });
            break;
            
            case "listY" :
                jq("." + block).css("overflow-y", "hidden");
                childrenBlock.wrapAll("<div class = \"listBlock" + i + "\"/>");
                jq(".listBlock" + i).css("transition-duration" , blockStyle[1]);
            break;

            default : 
                childrenBlock.hide();
                childrenBlock.eq(0).show();
            break;
        }

        if(verticalOrHorisontalTab === "vertical"){
            pageHeadBlock.eq(i).css({
                "flex-direction" : "column",
                "flex" : "1"
            })
            jq("." + block).css("flex", "5");
        }

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

                    switch ( blockStyle[0] ){

                        case "listX" :
                            jq(".listBlock" + i).css("transform", "translateX(" + j * -100 + "%)");
                        break;

                        case "listY" :
                            jq(".listBlock" + i).css("transform", "translateY(" + j * -jq("." + block).height() + "px)");
                        break;

                        default :
                            childrenBlock.eq(j).show();
                            childrenBlock.eq(prevPage[i]).hide();
                        break;
                    }

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