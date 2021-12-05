import * as express from "express";
import {
   addOneToTrainingsgroup, addOneToTrainingsPlan,
   addOneUebung, deleteSingelUebungInTrainingsplan, deleteSingelUebungInUebungsgroup, deleteUebunggenerell,
   getAllUebungen,
   getAllUebungenFromTrainingsplan,
   getAllUebungenFromUebungsGroup
} from "../models/uebungen";

const router = express.Router();


router.get('/', (_req: any , res:any) => {
   getAllUebungen().then(uebungen =>{
      res.status(200).send(uebungen);
   }).catch(err => {
      res.status(404).send("keine uebung  gefunden");
   });
});

router.get('/:id' ,(req: any, res:any) =>{
   if(req.query.fromGroup == 1){
   getAllUebungenFromUebungsGroup(req.trainingsGroup_id).then(uebungen =>{
      res.status(200).send(uebungen);
   }).catch(err =>{
      res.status(404).send("keine solche Uebung in dem in Group")
   });
   }
   else if (req.query.fromPlan == 1){
      getAllUebungenFromTrainingsplan(req.trainingsplan_id).then(uebungen =>{
         res.status(200).send(uebungen);
      }).catch(err =>{
         res.status(404).send("keine solche Uebung in Plan")
      });
   }
   else {
      res.status(400).send("bad request");
   }
});

router.post('/', (req: any, res:any) =>{
   addOneUebung( req.body.uebungs_beschreibung, req.body.uebungsZeitInMin);
   res.status(200).send("item send");
   console.log(req.body);
})

router.post('/:id' , (req: any, res:any) => {
if(req.query.fromGroup ==1){
   addOneToTrainingsgroup(req.uebungs_id, req.body.trainingsGroup_id , req.body.UGCsameUebungen);
   res.status(200).send("uebungs in  Gruppe geaddet");
   console.log(req.body);
}
else if (req.query.fromGroup ==1){
   addOneToTrainingsPlan(req.uebungs_id, req.body.trainingsplan_id , req.body.numberOfSp);
   res.status(200).send("uebung in Plan geaddet");
   console.log(req.body);
}
else {
   res.status(400).send("bad request");
}
});

router.delete('/', (req: any, res:any ) =>{
   deleteUebunggenerell(req.uebungs_id);
   res.status(200).send("uebung Deletet")

});

router.delete('/:id', (req:any, res:any) => {
   if(req.query.fromPlan == 1){
      deleteSingelUebungInUebungsgroup(req.uebungs_id, req.body.trainingsGroup_id);
      res.status(200).send("Uebung geloescht");
   }
   else if(req.query.fromPlan == 1){
      deleteSingelUebungInTrainingsplan(req.uebungs_id, req.body.trainingsplan_id);
      res.status(200).send("uebung gelöscht");
   }
   else {
      res.status(400).send("bad request");
   }
});


export {router as uebungsRouter}
