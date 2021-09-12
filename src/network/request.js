import axios from "axios";

    const instance2 = axios.create({
        headers:{
            "Content-Type": "application/json;charset=utf-8",
        },
        
        baseURL:'http://106.15.179.105:3000/',
        timeout:5000
    })
    instance2.interceptors.request.use(config =>{
        console.log(config)
        // 拦截config，要返回，否则报错
        return config
    },err =>{
        console.log(err)
    })

