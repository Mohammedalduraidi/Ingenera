const { missions } = require('../../../Database/index')


module.exports = addMisstion = (req, res) => {
    console.log("check is here", req.body)
    let mission = new missions({ ...req.body })
    mission.save((err, data) => {
        if (err) {
            console.log("Erorr ", err);
            res.sendStatus(500);
            return;
        }
        res.send({ message: "Your mission has been saved", status: 200, payload: data })
        return;
    })

}