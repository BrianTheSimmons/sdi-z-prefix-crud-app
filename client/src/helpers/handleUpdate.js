const handleUpdate = async (e, newItemDetails) => {
  await fetch(`http://localhost:5000/items/${newItemDetails.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItemDetails),
  });
};

export default handleUpdate;
