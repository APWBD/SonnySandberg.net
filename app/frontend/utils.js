import { config } from './config.js';

var w = window,
   d = document,
   e = d.documentElement,
   g = d.getElementsByTagName('body')[0],
   x = w.innerWidth || e.clientWidth || g.clientWidth,
   y = w.innerHeight || e.clientHeight || g.clientHeight;

export function importCSS(filePath)
{
   const link = document.createElement('link');
   link.rel = 'stylesheet';
   link.type = 'text/css';
   link.href = config.css_path + filePath + '.css';
   document.head.appendChild(link);
}

export function goTo(wheretogo)
{
   var url = location.href;  // entire url including querystring - also: window.location.href;
   var baseURL = url.substring(0, url.indexOf('/', 14));
   top.location.href = baseURL + '/' + wheretogo;
}

export function goToNew(wheretogo)
{
   window.open('http://' + wheretogo, '_blank');
}

export function getUrlParts()
{
   var path = window.location.pathname;
   var parts = path.split("\/");

   for (let i = parts.length - 1; i >= 0; i--)
   {
      if (parts[i].length < 1)
      {
         parts.splice(i, 1);
      }
   }

   return parts;
}

export function getCurrentPage()
{
   return getUrlParts()[0];
}

export function setFocus(element)
{
   var elem = document.getElementById(element);
   elem.focus();
}

export function sanitizeInput(input)
{
   const harmfulPatterns = [
      /--/g, // SQL comment
      /;/g,  // SQL statement separator
      /'/g,  // Single quote
      /"/g,  // Double quote
      /\\/g, // Backslash
      /\*/g, // Asterisk
      /\b(OR|AND|DROP|SELECT|INSERT|DELETE|UPDATE|CREATE|ALTER|EXEC|UNION|ALL|NULL)\b/gi // SQL keywords
   ];

   let sanitizedInput = input;
   for (let pattern of harmfulPatterns)
   {
      sanitizedInput = sanitizedInput.replace(pattern, '');
   }

   return sanitizedInput;
}

export function bottomScrollReached(e, pxToBottomBeforeTrigger)
{
   var bottomReached = false;

   var elem = $(e.currentTarget);
   if ((Math.abs(elem[0].scrollHeight - elem.scrollTop() - elem.outerHeight()) < pxToBottomBeforeTrigger))
   {
      bottomReached = true;
   }

   return bottomReached;
}

/**
 * Requires the objs in the array to have an
 * id, which is looked for in the array's objects.
 * @param {*} obj
 * @param {Array} arr
 */
export function inArray(obj, arr)
{
   return new Promise(resolve =>
   {
      // Includes function was not always working, so this solution instead
      let toReturn = false;
      for (let o of arr)
      {
         if (o.id == obj.id)
         {
            toReturn = true;
            break;
         }
      }

      resolve(toReturn);
   });
}