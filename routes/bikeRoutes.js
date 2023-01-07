const express = require('express');
const router = express.Router();
const bikesRepository = require('../DB/bikesRepository')

function funcEnvelope(func)     
{
    return async (req, res)=>
    {
        try 
        {
            console.log("at funcEnvelope");
            let data = await func(req.body,req.params);
            console.log(data);
            res.send(data);
        }
        catch (err) 
        {
            res.send(err);
        }
    } 
     
 }

//--------------------------------------

// Get all user
router.get("/activity/:userId",funcEnvelope(bikesRepository.getUserActivity));
 
router.post("/addEntrance/",funcEnvelope(bikesRepository.addEntrance));

router.post("/UpdateEntranceLogOutTime/:EntranceId",funcEnvelope(bikesRepository.UpdateEntranceLogOutTime));

router.get("/getGradeTrail/:trailId",funcEnvelope(bikesRepository.GetAverageGradingTrail ));

router.get("/getGradeBike/:bikeId",funcEnvelope(bikesRepository.GetAverageGradingBike ));

router.get("/HasUserVoteToTRail/:userId/:trailId",funcEnvelope(bikesRepository.HasUserVoteToTRail ));

router.get("/HasUserVoteToBIke/:userId/:bikeId",funcEnvelope(bikesRepository.HasUserVoteToBIke ));

router.post("/AddUser/",funcEnvelope(bikesRepository.AddUser ));

router.get("/GetAllVotesForTrail/:trailId",funcEnvelope(bikesRepository.GetAllVotesForTrail));

router.get("/GetAllVotesForBike/:bikeId",funcEnvelope(bikesRepository.GetAllVotesForBike));

router.get("/GetNumberOfUsers/",funcEnvelope(bikesRepository.GetNumberOfUsers));

module.exports = router;
