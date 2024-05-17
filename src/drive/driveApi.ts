import { fetchApi } from "../api/fetchApi";
import { DriveParams } from "./tDrive";
const DRIVE_PATH = '/resources/google-upload'

export const fetchUploadToolImages = ({ images, toolBarcode }: { images: FormData, toolBarcode: string }) =>
  fetchApi({ method: 'PATCH', path: DRIVE_PATH, queryParams: { toolBarcode }, body: images, contentTypeAuto: true })

export const fetchDeleteToolImages = (driveParams: DriveParams) => 
  fetchApi({ method: 'PATCH', path: `${DRIVE_PATH}/clean`, queryParams: driveParams})