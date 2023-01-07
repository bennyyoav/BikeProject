
const postData = (url,method='GET',body={}) => {
    console.log("in GetAllActivityOfUser");
    console.log(`http://localhost/users/GetAllVotesForTrail/${userId}`);
    fetch(url, {method: 'GET'})
    
        .then((resultFromServer) => {
            console.log(resultFromServer)
            return resultFromServer.json();
        })
        .then((resultAsObj) => {
            console.log(resultAsObj);
            let str = "";
        })
        .catch((err) => {
            console.log(err);
            //throw(err);
  
    
        })
}
//===============================================================================
userId=1
postData(`http://localhost/users/GetAllVotesForTrail/${userId}`);
userId=2
postData(`http://localhost/users/GetAllVotesForTrail/${userId}`);

async function GetAllActivityOfUser2(url, data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
     /// body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  userId=1
  GetAllActivityOfUser2(`http://localhost/users/GetAllVotesForBike/${userId}
  `).then((res)=>{console.log(res);})