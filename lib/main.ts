import $ from "jquery";

interface ArtProject {
    title: string,
    artist: string
}

interface ResponseBody {
    type:string,
    list: Array<ArtProject>
}

interface Response {
    data: ResponseBody,
    status: string,
}

let list:Array<ArtProject> = [
    {title: "David", artist: "Michelangelo di Lodovico Buonarroti Simoni"},
    {title: "The Last Supper", artist: "Leonardo da Vinci"},
    {title: "Primavera", artist: "Sandro Botecelli"}
];

let data:ResponseBody = { 
        type: "art",
        list
    }

const mockJSON:Response = {
    data,
    status: "200 OK"
}

function createList({type, list}:ResponseBody){
    let deferred:Promise<string>;
    if (type === "art"){
            deferred = artList(list);
    } else {
        // other types.
    }
    
    deferred.then(listings => $("#art_listings").html(listings));
}

function artList(list:Array<ArtProject>): Promise<string>{
    let listings = "";
    for (let art of list){
        let { title, artist:person } = art;
        let key:string = "artist";
        listings += `
            <li>
                <span class="title">${title}</span> - <span class="${key}">${person}</span>
            </li>`;
    }
    // even though this is a mundane example, when I'm sending stuff off 
    return new Promise((resolve, reject) => resolve(listings));
}

function delegatesData({ data, status = "200"}: Response):void{
    if(status.match("200")){
        createList(data);
    }
}

delegatesData(mockJSON);