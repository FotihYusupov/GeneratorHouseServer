(()=>{var e={991:(e,t,r)=>{const o=r(608);t.getCategories=async(e,t)=>{try{const e=await o.find();return t.json(e)}catch(e){return t.json("Interval server error")}}},870:(e,t,r)=>{const o=r(738),{v4:s}=r(828),n=r(404),c=o.diskStorage({destination(e,t,r){r(null,"uploads/")},filename(e,t,r){r(null,`${s()}.${t.originalname}`)}});t.upload=o({storage:c}),t.getAll=async(e,t)=>{try{const e=await n.find();return t.json(e)}catch(e){return t.json(e)}},t.byCategory=async(e,t)=>{try{const r=await n.find({category:e.params.categoryId});return t.json(r)}catch(e){return t.json(e)}},t.byId=async(e,t)=>{try{const r=await n.findOne({_id:e.params.id});return r.views+=1,await r.save(),t.json(r)}catch(e){return t.json(e)}},t.addProduct=async(e,t)=>{try{const r=new n({product_title:e.body.productTitle,product_desc:e.body.productDesc,category:e.body.category,information:e.body.information});return e.body.price&&(r.product_price=e.body.productPrice),await r.save(),t.json(r)}catch(e){return t.send(e)}},t.searchProduct=async(e,t)=>{try{const r=new RegExp(e.params.title,"i"),o=await n.find({product_title:{$regex:r}});return t.json(o)}catch(e){return t.json(e)}},t.addImg=async(e,t)=>{try{const{id:r}=e.params,o=await n.findOne({_id:r});return o?(o.product_img.push(process.env.URL+e.files[0].filename),await n.updateOne({_id:r},{product_img:o.product_img}),t.send("Product updated")):t.status(404).json("product not found")}catch(e){return t.json(e)}},t.updateProduct=async(e,t)=>{try{const r=await n.updateOne({_id:e.params.id},{product_title:e.body.productTitle,product_desc:e.body.productDesc,product_price:e.body.productPrice,product_img:e.body.productImg,category:e.body.category,information:e.body.information},{new:!0});return t.json(r)}catch(e){return t.json(e)}},t.offerProduct=async(e,t)=>{try{const r=await n.findById({_id:e.params.id});return r.offer=!0,r.new_price=e.body.newPrice,await r.save(),t.json(r)}catch(e){return t.json("Internal server error")}},t.deleteProduct=async(e,t)=>{try{return await n.deleteOne({_id:e.params.id}),t.json("Product deleted")}catch(e){return t.json("Internal server error")}}},53:(e,t,r)=>{const{sign:o}=r(751),s=r(901);t.login=async(e,t)=>{try{const{userName:r,password:n}=e.body;if(r||n){const r=await s.findOne({name:e.body.userName,password:e.body.password});return r?t.json(o(r._id.toString())):t.status(404).json("User not found")}}catch(e){return t.json("Interval server error")}}},737:(e,t,r)=>{const{verify:o}=r(751);e.exports=function(e,t,r){const s=e.headers.authorization;if(s){const e=s.split(" ")[1];e&&o(e)&&r()}else t.status(401).json("Token is not defined")}},608:(e,t,r)=>{const o=r(185),s=new o.Schema({category_name:{type:String}}),n=o.model("categories",s);e.exports=n},404:(e,t,r)=>{const o=r(185),s=new o.Schema({product_img:{type:Array,default:[]},product_title:{type:String},product_desc:{type:String},product_price:{type:Number,default:0},category:{type:o.Types.ObjectId,ref:"categories"},information:{type:Array,default:[]},offer:{type:Boolean,default:!1},new_price:{type:Number,default:0},views:{type:Number,default:0}}),n=o.model("products",s);e.exports=n},901:(e,t,r)=>{const o=r(185),s=new o.Schema({name:{type:String},password:{type:String}}),n=o.model("users",s);e.exports=n},655:(e,t,r)=>{const{Router:o}=r(860),s=r(991),n=o();n.get("/categories",s.getCategories),e.exports=n},768:(e,t,r)=>{const{Router:o}=r(860),s=r(870),n=r(737),c=o();c.get("/products",s.getAll),c.get("/category/:categoryId",s.byCategory),c.get("/product/:id",s.byId),c.get("/search/:title",s.searchProduct),c.post("/add-product",n,s.addProduct),c.put("/update-product/:id",n,s.updateProduct),c.put("/add-img/:id",s.upload.array("images"),s.addImg),c.put("/offer/:id",n,s.offerProduct),c.delete("/delete/:id",n,s.deleteProduct),e.exports=c},194:(e,t,r)=>{const{Router:o}=r(860),s=r(584),n=r(655),c=r(768),a=o();a.use(s),a.use(n),a.use(c),e.exports=a},584:(e,t,r)=>{const{Router:o}=r(860),s=r(53),n=o();n.post("/login",s.login),e.exports=n},751:(e,t,r)=>{const o=r(344);t.sign=e=>o.sign(e,process.env.SECRET_KEY),t.verify=e=>o.verify(e,process.env.SECRET_KEY)},986:e=>{"use strict";e.exports=require("body-parser")},582:e=>{"use strict";e.exports=require("cors")},142:e=>{"use strict";e.exports=require("dotenv")},860:e=>{"use strict";e.exports=require("express")},344:e=>{"use strict";e.exports=require("jsonwebtoken")},185:e=>{"use strict";e.exports=require("mongoose")},738:e=>{"use strict";e.exports=require("multer")},828:e=>{"use strict";e.exports=require("uuid")}},t={};function r(o){var s=t[o];if(void 0!==s)return s.exports;var n=t[o]={exports:{}};return e[o](n,n.exports,r),n.exports}(()=>{const e=r(142),t=r(860),o=r(986),s=r(185),n=r(582),c=r(194);e.config();const a=t();a.use(t.json()),a.use(t.urlencoded({extended:!0})),a.use(n()),a.use(t.static("uploads")),a.use(o.urlencoded({extended:!1})),a.use(o.json()),a.use("/api",c),s.connect(process.env.MONGO_URL).then((()=>a.listen(process.env.PORT||3001,(()=>console.log("server is run"))))).catch((e=>console.log("db error",e.message)))})()})();