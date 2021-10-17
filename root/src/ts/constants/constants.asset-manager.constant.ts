import { AssetManager } from "../managers/managers.asset.class";

/** constant reference to asset manager, only place this should be instantiated, on reflection this could be done with a singleton pattern instead of a constant*/
export const ASSET_MANAGER = new AssetManager()