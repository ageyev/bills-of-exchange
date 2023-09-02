import fs from "node:fs";
import path from "node:path";

const writeObjectToFile = (filePath: string, object: Object) => {

  fs.writeFileSync(
    path.join(__dirname, filePath),
    JSON.stringify(object)
  );
};

export default writeObjectToFile;