const http = require("http");
const PORT =8081;
const toDoList = ["Harsha","Reddy"];
http.createServer((req,res)=>{
    const {method,url} = req;
    if(url=="/todos"){
        if(method=== "GET"){
            res.writeHead(200);
            res.write(toDoList.toString());
        }else if(method=== "POST"){
            let body = " ";
            req.on('error',(err)=>{
                console.error(err)

            }).on('data',(chunk)=>{
                body +=chunk;
                console.log("chunk: ",chunk)
            }).on('end',()=>{
                body=JSON.parse(body)
                console.log("body:",body)
                let newtodo = toDoList;
                newtodo.push(body.item);
                console.log(newtodo)
            })
            

        }else if(method==="DELETE"){
            let body = " ";
            req.on('error',(err)=>{
                console.error(err)

            }).on('data',(chunk)=>{
                body +=chunk;
                //console.log("chunk: ",chunk)
            }).on('end',()=>{
                body=JSON.parse(body)
                console.log("body:",body)
                let deletethis = body.item;
                for(i=0; i<toDoList.length;i++){
                    if(toDoList[i]===deletethis)
                        toDoList.splice(i,1);
                    break;
                }

            })

        }
        else{
            res.writeHead(501);
        }
    }else if(url==="/"){
    }else{
        res.writeHead(200);
        res.write("hello harsha");
    }
    res.end();
})

.listen(PORT, ()=>{
    console.log(`Nodejs Server is Up and Running Succesfully on Port ${PORT}`)
})