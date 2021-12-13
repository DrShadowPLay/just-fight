import * as express from "express";
import {
    addOneToTrainingsgroup, addOneToTrainingsPlan,
    addOneUebung, deleteSingelUebungInTrainingsplan, deleteSingelUebungInUebungsgroup, deleteUebunggenerell,
    getAllUebungen,
    getAllUebungenFromTrainingsplan,
    getAllUebungenFromUebungsGroup, getOneUebung, getOneUebungFromTrainigsgroup, getOneUebungFromTrainigsPlan
} from "../models/uebungen";

const router = express.Router();


router.get('/', (_req: any, res: any) => {//
    getAllUebungen().then(uebungen => {
        res.status(200).send(uebungen);
    }).catch(err => {
        res.status(404).send(err);
    });
});

router.get('/', (req: any, res: any) => {
    if (req.trainingsGroup_id) {//done
        getAllUebungenFromUebungsGroup(req.trainingsGroup_id).then(uebungen => {
            res.status(200).send(uebungen);
        }).catch(err => {
            res.status(404).send(err);
        });
    } else if (req.trainingsP_id) {
        getAllUebungenFromTrainingsplan(req.trainingsP_id).then(uebungen => {//done
            res.status(200).send(uebungen);
        }).catch(err => {
            res.status(404).send(err.message);
        });
    } else {
    }
});

router.get('/:uebungs_id', (req: any, res: any) => { // done
    if (req.trainingsGroup_id) {//done
        getOneUebungFromTrainigsgroup(req.params.uebungs_id, req.trainingsGroup_id).then(uebung => {
            res.status(200).send(uebung);
        }).catch(err => {
            res.status(404).send(err.message);
        });
        ;

    } else if (req.trainingsP_id) {  //done
        console.log("in trainingspP")
        console.log(req.params.uebungs_id + req.trainingsP_id)
        getOneUebungFromTrainigsPlan(req.params.uebungs_id, req.trainingsP_id).then(uebung => {
            res.status(200).send(uebung);
        }).catch(err => {
            res.status(404).send(err.message);
        });
    } else {
        getOneUebung(req.params.uebungs_id).then(uebung => {
            res.status(200).send(uebung)
        }).catch(err => {
            err.status(404).send(err.message);
        })

    }

});

router.post('/', (req: any, res: any) => {//done
    addOneUebung(req.body.uebungs_beschreibung, req.body.uebungsZeitInMin).then(uebung => {
        res.status(200).send(uebung)
    }).catch(err => {
        res.status(200).send(err);
    });
});


router.post('/:uebungs_id', (req: any, res: any) => { //done
    if (req.trainingsGroup_id) {//done
        console.log(req.trainingsGroup_id);
        addOneToTrainingsgroup(req.params.uebungs_id, req.trainingsGroup_id, req.body.numberOfSameUebungenInUebungsGroup);
        res.status(200).send("uebungs in  Gruppe geaddet");
        console.log(req.body);
    } else if (req.trainingsP_id) {//done
        console.log("hello");
        addOneToTrainingsPlan(req.params.uebungs_id, req.trainingsP_id, req.body.numberOfSameUebungenInOneTrainingsPlan);
        res.status(200).send("uebung in Plan geaddet");
        console.log(req.body);
    } else {

        res.status(400).send("bad request");
    }
});

router.delete('/:uebungs_id', (req: any, res: any) => { //done
    console.log(req.params.uebungs_id);
    deleteUebunggenerell(req.params.uebungs_id);
    res.status(200).send("uebung Deletet")

});

router.delete('/:uebungs_id', (req: any, res: any) => { //done
    if (req.trainingsGroup_id) {
        deleteSingelUebungInUebungsgroup(req.params.uebungs_id, req.body.trainingsGroup_id);
        res.status(200).send("Uebung geloescht");
    } else if (req.trainingsP_id) {//done
        deleteSingelUebungInTrainingsplan(req.params.uebungs_id, req.body.trainingsP_id);
        res.status(200).send("uebung gelöscht");
    } else {
        res.status(400).send("bad request");
    }
});


export {router as uebungsRouter}
