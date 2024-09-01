## <b> <span style='color:#9146ff'>|</span> Express Framework</b>


### <b><span style='color:#9146ff'>|</span> Notes</b>

* `app.use(express.json())` : it will parse incoming requests with JSON payloads and make it available in request.body. 

  * json is the data format that express can    understand while json payloads refer to the actual json data being sent or received in a network request or response. 
* `app.use(express.static())`: used to access static folders 