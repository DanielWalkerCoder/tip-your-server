const http = require('http')
const fs = require('fs')

http
    .createServer(function (request, response){
        if(request.url === '/create-directory' && request.method === "POST"){
            fs.mkdir('./content', function(error){
                if(error){
                    response.end(error)
                }else{
                    response.end('content folder created')
                }
            })
        }else
        if(request.url === '/create-text' && request.method === "POST"){
            let body = ''
            request.on("data", function (data){
                body += data.toString()
            })
            request.on("end", function(){
                let parsedBody = JSON.parse(body)
                fs.writeFile('./randomText.txt', parsedBody.message, function(error){
                    if(error){
                        response.end(error)
                    }else{
                        response.end('randomText.txt created')
                    }
                })
            })
        }else
        if(request.url === '/new-folder-and-file' && request.method === "POST"){
            fs.readFile('randomText.txt', function(error, data){
                if(error){
                    response.end(error)
                }else{
                    fs.writeFile('./content/verbage.txt', data, function(error){
                        if(error){
                            response.end(error)
                        }else{
                            console.log('verbage.txt created')
                            setTimeout(function(){
                                fs.unlinkSync('./content/verbage.txt')
                                fs.rmdir('./content', function(error){
                                    if(error){
                                        response.end(error)
                                    }else{
                                        response.end('content removed')
                                    }
                                })
                            }, 7000)
                        }
                    })
                }
            })
        }else{
            response.end()
        }
    })
    .listen(3000, function(){
        console.log('Yo face')
    })



//         }else if(request.url === "/update-a-file" && request.method === "PUT"){
//             let body = ""
//             request.on("data", function (data){
//                 body += data.toString()
//             })
//             request.on("end", function (){
//                 let parsedBody = JSON.parse(body)
//                 fs.appendFile(parsedBody.fileName, `\n${parsedBody.message}`, function (error){
//                     if(error){
//                         response.end(error)
//                     }else{
//                         response.end("File updated")
//                     }
//                 })
//             })
//         }else if(request.url === "/delete-a-file" && request.method === "DELETE"){
//             let body = ""
//             request.on("data", function (data){
//                 body += data.toString()
//             })
//             request.on("end", function (){
//                 let parsedBody = JSON.parse(body)
//                 fs.unlink(parsedBody.fileName, function (error){
//                     if(error){
//                         response.end(error)
//                     }else{
//                         response.end(`${parsedBody.fileName} deleted`)
//                     }
//                 })
//             })
//         }else{
//             return response.end()
//         }
//     })