import fs from "node:fs/promises";

export const getPlaces = async (_req, res) => {
    await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, 3000),
    );

    const fileContent = await fs.readFile("data/places.json");
    const placesData = JSON.parse(fileContent);

    res.status(200).json({
        places: placesData,
    });
};

export const getUserPlaces = async (_req, res) => {
    await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, 3000),
    );

    const fileContent = await fs.readFile("./data/user-places.json");
    const places = JSON.parse(fileContent);

    res.status(200).json({ places });
};

export const setUserPlaces = async (req, res) => {
    const placeId = req.body.placeId;

    const fileContent = await fs.readFile("./data/places.json");
    const placesData = JSON.parse(fileContent);

    const place = placesData.find((place) => place.id === placeId);

    const userPlacesFileContent = await fs.readFile("./data/user-places.json");
    const userPlacesData = JSON.parse(userPlacesFileContent);

    let updatedUserPlaces = userPlacesData;

    if (!userPlacesData.some((p) => p.id === place.id)) {
        updatedUserPlaces = [...userPlacesData, place];
    }

    await fs.writeFile(
        "./data/user-places.json",
        JSON.stringify(updatedUserPlaces, null, 4),
    );

    res.status(200).json({ userPlaces: updatedUserPlaces });
};

export const removeUserPlaces = async (req, res) => {
    const placeId = req.params.id;

    const userPlacesFileContent = await fs.readFile("./data/user-places.json");
    const userPlacesData = JSON.parse(userPlacesFileContent);

    const placeIndex = userPlacesData.findIndex(
        (place) => place.id === placeId,
    );

    let updatedUserPlaces = userPlacesData;

    if (placeIndex >= 0) {
        updatedUserPlaces.splice(placeIndex, 1);
    }

    await fs.writeFile(
        "./data/user-places.json",
        JSON.stringify(updatedUserPlaces),
    );

    res.status(200).json({ userPlaces: updatedUserPlaces });
};
