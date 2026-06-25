function status(request, response) {
  response.status(200).json({ chave: "LETS GO" });
}

export default status;
