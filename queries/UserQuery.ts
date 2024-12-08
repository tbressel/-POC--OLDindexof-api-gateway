import { UserQueriesConfig } from './UserQueriesConfig';



/**
 * Class to handle the queries related to the user
 * Herits from UserQueriesConfig to keep safe the queries inside the class
 */
export class QueryUser extends UserQueriesConfig {

    /**
     * 
     * @returns string containing the query to get all users
     */
    public static fetchAllUsers(id: number): string {
        return this.getAllUsers(id);
    }
}