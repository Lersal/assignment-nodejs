const { postNew } = require("../models");

const getAllPost = async (req, res, next) => {
  try {
    const result = await postNew.findAll();
    return res.status(200).json({
      message: "Successfully",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error" + err.message,
    });
  }
};

const getOnePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await postNew.findOne({
      where: {
        id: postId,
      },
    });
    if (!post) {
      return res.status(404).json({
        message: "Data tidak ditemukan",
      });
    }
    return res.status(200).json({
      message: "Sucessufully",
      data: post,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error" + err.message,
    });
  }
};

const createPost = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { title, body } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Judul tidak boleh kosong",
      });
    }

    if (!body) {
      return res.status(400).json({
        message: "Konten tidak boleh kosong",
      });
    }

    const newPost = await postNew.create({
      user_id: userId,
      title: title,
      body: body,
    });

    return res.status(201).json({
      message: "Post berhasil dibuat",
      data: newPost,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error" + err.message,
    });
  }
};

const updatePost = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { postId } = req.params;
    const { title, body } = req.body;
    const post = await postNew.findOne({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return res.status(404).json({
        message: "Data tidak ditemukan",
      });
    }

    if (userId !== post.user_id) {
      return res.status(403).json({
        message: "Tidak dapat merubah post",
      });
    }

    if (!title) {
      return res.status(400).json({
        message: "Judul tidak boleh kosong",
      });
    }

    if (!body) {
      return res.status(400).json({
        message: "Konten tidak boleh kosong",
      });
    }

    await postNew.update(
      {
        user_id: userId,
        title: title,
        body: body,
      },
      {
        where: {
          id: post.id,
        },
      }
    );

    const data = await postNew.findOne({
      where: {
        id: post.id,
      },
    });

    return res.status(200).json({
      message: "Berhasil update post",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error" + err.message,
    });
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await postNew.findOne({
      where: {
        id: postId,
      },
    });
    if (!post) {
      return res.status(404).json({
        message: "Data tidak ditemukan",
      });
    }

    const deletePost = await postNew.destroy({
      where: {
        id: post.id,
      },
    });

    return res.status(200).json({
      message: "Berhasil menghapus post",
      data: deletePost,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error" + err.message,
    });
  }
};

module.exports = {
  getAllPost,
  getOnePost,
  createPost,
  updatePost,
  deletePost,
};
