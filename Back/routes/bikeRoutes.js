const express = require('express');
const router = express.Router();
const bikesRepository = require('../DB/bikesRepository')
const path = require('node:path');
const os = require('node:os'); 
const app = express()
const multer = require('multer')
const storageOfUserImages = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, process.env.RELATIVE_IMG_PATH)
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    },
  })
const uploadUserImages = multer({ storage: storageOfUserImages })
const cors = require('cors')
app.use(cors())
const dotenv = require('dotenv');
dotenv.config();



// Get all user
router.get("/activity/:userId",bikesRepository.getUserActivity);
 
router.post("/addEntrance/",bikesRepository.addEntrance);

router.post("/UpdateEntranceLogOutTime/:EntranceId",bikesRepository.UpdateEntranceLogOutTime);

router.get("/GetAverageGradingTrail/:trailId",bikesRepository.GetAverageGradingTrail );

router.get("/GetAverageGradingBike/:bikeId",bikesRepository.GetAverageGradingBike );

router.get("/HasUserVoteToTRail/:userId/:trailId",bikesRepository.HasUserVoteToTRail);

router.get("/HasUserVoteToBIke/:userId/:bikeId",bikesRepository.HasUserVoteToBIke);

router.post("/AddUser/",bikesRepository.AddUser);

router.get("/GetAllVotesForTrail/:trailId",bikesRepository.GetAllVotesForTrail);

router.get("/GetAllVotesForBike/:bikeId",bikesRepository.GetAllVotesForBike);

router.get("/GetNumberOfUsers/",bikesRepository.GetNumberOfUsers);

router.get("/GetNumberOfVoteBike/",bikesRepository.GetNumberOfVoteBike);

router.get("/Bikes/",bikesRepository.getBikes);

router.get("/Trails/",bikesRepository.getTrails);

router.get("/GetNumberOfVoteBike/:bikeId",bikesRepository.GetNumberOfVoteBike);

router.get("/GetNumberOfVoteTrail/:trailId",bikesRepository.GetNumberOfVoteTrail);

router.post("/AddVoteAndResponseBike/",bikesRepository.AddVoteAndResponseBike);

router.post("/AddVoteAndResponseBike/",bikesRepository.AddVoteAndResponseBike);

router.post("/getUserImage/", uploadUserImages.single('file'), function (req, res) {

        res.send(JSON.stringify({file:path.join('file:',os.hostname(),
        req.file.destination.split(':')[1],
        req.file.filename)}))

});     
 




module.exports = router;
