import adoption from "../../model/adoption-model.js";
import * as auth from "../../services/auth-service.js";

//gget the picture from the front-end and save in the database
export function create(req, res) {
  //create post
  var object = req.body;
  //getting the author from the token
  object.author = auth.getUserId(req);
  //creating the object using the model
  var adoptionObj = new adoption(object);
  adoptionObj.save(function (error) {
    if (error) {
      return res.status(500).json();
    }
    return res.status(200).json({ message: "Saved successfully!" });
  });
}

//display
export function show(req, res) {
  //get post by id
  adoption.findOne(
    {
      _id: req.params.id,
    },
    function (error, adoption) {
      if (error) {
        return res.status(500).json({ message: "No data found!" });
      }

      return res.status(200).json({
        adoption: adoption,
      });
    }
  );
}

// export function showAll(req, res) {
//   adoption.find({}, function (error, adoption) {
//     if (error) {
//       return res.status(500).json({ message: "No data found!" });
//     }

//     return res.status(200).json({
//       adoption: adoption
//     });
//   }).sort({ createdAt: 1 });
// }
export function showAll(req, res) {
  var limit = parseInt(req.query.limit);
  var page = parseInt(req.query.page);
  console.log(page);
  console.log(limit);
  adoption
    .find()
    .skip(page - 1)
    .limit(limit)
    .then((adoption) => {
      return res.status(200).json({
        adoption: adoption,
      });
    });
}
export function countAll(req, res) {
  adoption.find({}, function (error, adoption) {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }

    return res.status(200).json({
      count: adoption.length,
    });
  });
}

//delete by from datase
export function remove(req, res) {
  adoption.deleteOne(
    {
      _id: req.params.id,
    },
    function (error) {
      if (error) {
        return res.status(500).json();
      }

      return res.status(200).json({ message: "Deleted successfully!" });
    }
  );
}

export function search(req, res) {
  const query = {
    petType: { $regex: req.body.petType, $options: "i" },
    $or: [
      { location: { $regex: req.body.search, $options: "i" } },
      { desc: { $regex: req.body.search, $options: "i" } },
      { petType: { $regex: req.body.search, $options: "i" } },
    ],
  };

  adoption
    .find(query, function (error, adoption) {
      if (error) {
        return res.status(500).json({ message: "No data found!" });
      }

      return res.status(200).json({
        adoption: adoption,
      });
    })
    .sort({ createdAt: req.body.sort });
}

export function update(req, res) {
  adoption.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
    },
    { new: true },
    function (error) {
      if (error) {
        return res.status(500).json();
      }
      return res.status(200).json({ message: "Updated successfully!" });
    }
  );
}
