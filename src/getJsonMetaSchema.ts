import Axios from "axios";

const metaSchemaUrl = 'http://json-schema.org/draft-07/schema'

export async function getJsonMetaSchema (): Promise<Object> {
  const result = await Axios.get(metaSchemaUrl)
  return result.data
}