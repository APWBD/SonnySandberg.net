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
         '10': true
      }

      this.keyboard = 2;
   }

   toggleTable(table)
   {
      this.tables[table] = !this.tables[table];
   }

   toggleAll()
   {
      for (let i = 1; i <= 10; i++)
      {
         this.tables[i] = true;
      }
   }

   getNumberOfProblems()
   {
      let problems =
      {
         '0': 0,
         '1': 19,
         '2': 36,
         '3': 51,
         '4': 64,
         '5': 75,
         '6': 84,
         '7': 91,
         '8': 96,
         '9': 99,
         '10': 100
      }

      let count = 0;
      for (let i = 1; i <= 10; i++)
      {
         if(this.tables[i]) count++;
      }

      return problems[count];
   }
}