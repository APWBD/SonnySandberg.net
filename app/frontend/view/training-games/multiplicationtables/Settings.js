export default class Settings
{
   constructor()
   {
      this.tables = {
         '1': true,
         '2': true,
         '3': true,
         '4': true,
         '5': true,
         '6': true,
         '7': true,
         '8': true,
         '9': true,
         '10': true,
         '11': false,
         '12': false,
         '13': false,
         '14': false,
         '15': false,
         '16': false,
         '17': false,
         '18': false,
         '19': false,
         '20': false
      }

      this.keyboard = 2;
   }

   toggleTable(table)
   {
      this.tables[table] = !this.tables[table];
   }

   toggleAll()
   {
      const count = Object.keys(this.tables).length;

      for (let i = 1; i <= count; i++)
      {
         this.tables[i] = true;
      }
   }

   // This function calculates the number of problems based on the number of tables selected.
   getProblemCount(n)
   {
      return Math.pow(n, 2);
   }

   getNumberOfProblems()
   {
      return this.getProblemCount(Object.values(this.tables).filter(v => v).length);
   }
}