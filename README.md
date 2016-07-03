# Destructuing in Action

ES2015 Destructuring is useful in everyday apps because it 1) makes code easier to read and manage and 2) it's very useful in the context of passing objects around. This is especially true when you combine destructuring with default values. 

    let list = [
        {title: "David", artist: "Michelangelo di Lodovico Buonarroti Simoni"},
        {title: "The Last Supper", artist: "Leonardo da Vinci"},
        {title: "Primavera", artist: "Sandro Botecelli"}
    ];

    let data = { 
            type: "art",
            list // shorthand helps keep code legible. enhanced object literals
        }

    const mockJSON = {
        data,
        status: "200 OK"
    }
    function delegatesData({ data, status = "200"}){
        if(status.match("200")){
            createList(data);
        }
    }



With TypeScript it's even more powerful, because you can use Interfaces and Generics to have concise typesafe code. For example, list is an array of art projects. To make this more managable, lets make a ArtProject interface.

    interface ArtProject {
        title: string,
        artist: string
    }

Now we can use that interface as Generic for the list Array type. 

    let list:Array<ArtProject> = [
        {title: "David", artist: "Michelangelo di Lodovico Buonarroti Simoni"},
        {title: "The Last Supper", artist: "Leonardo da Vinci"},
        {title: "Primavera", artist: "Sandro Botecelli"}
    ];

When we go to use the list, the editor/TS compiler is going to know that the deconstructed list is an Array of ArtProjects automatically. The ResponseBody interface guarantees an element named list which contains an Array of ArtProjects, so the list in the createList function does not require the type to be explicit. The artList function on the other hand is only looking for an Array or ArtProjects, so that type is explicit in the method signature.
    
    function createList({type, list}:ResponseBody){
        ...
        artList(list);
        ...
        });
    }

    function artList(list:Array<ArtProject>): Promise<string>{
        ...
        return new Promise( ... );
    }

View the example in lib/main.ts has the code.