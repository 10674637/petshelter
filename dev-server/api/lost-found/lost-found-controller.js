import lostFound from "../../model/lost-found-model.js";
import * as auth from "../../services/auth-service.js";
export function index(req, res) {
  //find all pets
  lostFound.find(function(error, data) {
    if (error) {
      return res.status(500).json();
    }

    if (!data) {
      return res.status(404).json({ message: "No data found!" });
    }

    return res.status(200).json({
      lostFound: data,
    });
  });
}

export function getByType(req, res) {
  //find all post by type
  //Lost = 1
  //Found = 2
  lostFound.find({ type: req.params.type }, function(error, data) {
    if (error) {
      return res.status(500).json();
    }

    if (!data) {
      return res.status(404).json({ message: "No data found!" });
    }

    return res.status(200).json({
      lostFound: data,
    });
  });
}
//gets picture from front end and save to database
export function create(req, res) {
  //create post
  var object = req.body;
  object.author = auth.getUserId(req);
  var lostFoundObj = new lostFound(object);
  lostFoundObj.save(function(error) {
    if (error) {
      return res.status(500).json();
    }
    return res.status(200).json({ message: "Saved successfully!" });
  });
}

//delete by from datase
export function remove(req, res) {
  lostFound.deleteOne(
    {
      _id: req.params.id,
    },
    function(error) {
      if (error) {
        return res.status(500).json();
      }

      return res.status(200).json({ message: "Deleted successfully!" });
    }
  );
}

//display
export function show(req, res) {
  //get post by id
  lostFound.findOne(
    {
      _id: req.params.id,
    },
    function(error, lostFound) {
      if (error) {
        return res.status(500).json({ message: "No data found!" });
      }

      return res.status(200).json({
        lostFound: lostFound,
      });
    }
  );
}

export function search(req, res) {
  const query = {
    petType: { $regex: req.body.petType, $options: "i" },
    location: { $regex: req.body.location, $options: "i" },
    type: { $in: req.body.type }
  };

  lostFound.find(query, function(error, lostFound) {
    if (error) {
      return res.status(500).json({ message: "No data found!" });
    }

    return res.status(200).json({
      lostFound: lostFound,
    });
  });
}

export function update(req, res) {
  lostFound.findByIdAndUpdate(
    req.body._id,
    {
      ...req.body,
    },
    { new: true },
    function(error) {
      if (error) {
        return res.status(500).json();
      }
      return res.status(200).json({ message: "Updated successfully!" });
    }
  );
}
