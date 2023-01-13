const express = require('express');
const router = express.Router();
const bikesRepository = require('../DB/bikesRepository')


// Get all user
router.get("/activity/:userId",bikesRepository.getUserActivity);
 
router.post("/addEntrance/",bikesRepository.addEntrance);

router.post("/UpdateEntranceLogOutTime/:EntranceId",bikesRepository.UpdateEntranceLogOutTime);

router.get("/getGradeTrail/:trailId",bikesRepository.GetAverageGradingTrail );

router.get("/getGradeBike/:bikeId",bikesRepository.GetAverageGradingBike );

router.get("/HasUserVoteToTRail/:userId/:trailId",bikesRepository.HasUserVoteToTRail);

router.get("/HasUserVoteToBIke/:userId/:bikeId",bikesRepository.HasUserVoteToBIke);

router.post("/AddUser/",bikesRepository.AddUser);

router.get("/GetAllVotesForTrail/:trailId",bikesRepository.GetAllVotesForTrail);

router.get("/GetAllVotesForBike/:bikeId",bikesRepository.GetAllVotesForBike);

router.get("/GetNumberOfUsers/",bikesRepository.GetNumberOfUsers);

module.exports = router;
