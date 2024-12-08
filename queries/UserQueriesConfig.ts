export class UserQueriesConfig {
  /**
   *
   * Method to return the query to get all users
   * @returns string containing the query to get all users
   */
  protected static getAllUsers(id: number): string {
    return `SELECT 
                u.id_user,
                api.key_hash,
                api.key_name 
            FROM to_access ta
            JOIN _user u ON ta.id_user = u.id_user 
            JOIN api_key api ON ta.id_api_key = api.id_api_key 
            WHERE u.id_user = ${id};`;
  }
}
