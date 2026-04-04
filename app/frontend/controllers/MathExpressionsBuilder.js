export default class MathExpressionsBuilder 
{
    /**
 * Opretter en opgave til reduktion eller ligningsløsning.
 *
 * Niveau 1:
 * - Ét udtryk, som skal reduceres
 *
 * Niveau 2:
 * - Ligning med én løsning x = helt tal
 * - Parenteser på mindst én side
 *
 * Niveau 3:
 * - Ligning med én løsning x = helt tal
 * - Flere parenteser og mere blandede fortegn
 */
    generateReductionTask(level = 1)
    {
        if (level === 1)
        {
            return this.createLevel1Task();
        }

        if (level === 2)
        {
            return this.createLevel2Task();
        }

        if (level === 3)
        {
            return this.createLevel3Task();
        }

        throw new Error("Ugyldigt niveau. Vælg 1, 2 eller 3.");
    }

    /* =========================================================
       GENERELLE HJÆLPEFUNKTIONER
    ========================================================= */

    /**
     * Returnerer et helt tilfældigt tal mellem min og max, begge inklusive.
     */
    randInt(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Returnerer et tilfældigt helt tal mellem min og max, men aldrig 0.
     */
    randNonZero(min, max)
    {
        let n;

        do
        {
            n = this.randInt(min, max);
        }
        while (n === 0);

        return n;
    }

    /**
     * Returnerer en kopi af arrayet i tilfældig rækkefølge.
     */
    shuffle(array)
    {
        const copy = [...array];

        for (let i = copy.length - 1; i > 0; i--)
        {
            const j = this.randInt(0, i);
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }

        return copy;
    }

    /**
     * Lægger to reducerede udtryk sammen.
     *
     * Et udtryk gemmes som:
     * {
     *    x: koefficient foran x,
     *    c: konstantled
     * }
     */
    addExpressions(a, b)
    {
        return {
            x: a.x + b.x,
            c: a.c + b.c
        };
    }

    /**
     * Summerer alle parts i et array.
     *
     * Hver part forventes at have formen:
     * {
     *    text: "...",
     *    value: { x: ..., c: ... }
     * }
     */
    sumParts(parts)
    {
        return parts.reduce(
            (sum, part) => this.addExpressions(sum, part.value),
            { x: 0, c: 0 }
        );
    }

    /**
     * Beregner værdien af et reduceret udtryk for en bestemt x-værdi.
     *
     * Hvis expr = ax + b og x = solution, returneres a*solution + b.
     */
    evaluateExpression(expr, solution)
    {
        return expr.x * solution + expr.c;
    }

    /* =========================================================
       FORMATERING
    ========================================================= */

    /**
     * Formatterer et x-led pænt.
     *
     *  1  -> "x"
     * -1  -> "-x"
     *  4  -> "4x"
     *  0  -> ""
     */
    formatXTerm(coefficient)
    {
        if (coefficient === 0) return "";
        if (coefficient === 1) return "x";
        if (coefficient === -1) return "-x";

        return `${coefficient}x`;
    }

    /**
     * Samler en liste af tekst-led til ét matematisk udtryk.
     *
     * Eksempel:
     * ["3x", "-2", "5"] -> "3x - 2 + 5"
     */
    joinTerms(terms)
    {
        const filtered = terms.filter(Boolean);

        if (filtered.length === 0)
        {
            return "0";
        }

        let result = filtered[0];

        for (let i = 1; i < filtered.length; i++)
        {
            if (filtered[i].startsWith("-"))
            {
                result += " - " + filtered[i].slice(1);
            }
            else
            {
                result += " + " + filtered[i];
            }
        }

        return result;
    }

    /**
     * Formatterer et reduceret udtryk {x, c} til tekst.
     *
     * Eksempler:
     * {x: 3, c: -2} -> "3x - 2"
     * {x: 1, c: 0}  -> "x"
     * {x: 0, c: 5}  -> "5"
     */
    formatReducedExpression(expr)
    {
        const terms = [];

        if (expr.x !== 0)
        {
            terms.push(this.formatXTerm(expr.x));
        }

        if (expr.c !== 0)
        {
            terms.push(String(expr.c));
        }

        if (terms.length === 0)
        {
            return "0";
        }

        return this.joinTerms(terms);
    }

    /* =========================================================
       BYGGESTEN TIL OPGAVER
    ========================================================= */

    /**
     * Laver et simpelt x-led som byggeklods.
     *
     * Returnerer fx:
     * {
     *    text: "-3x",
     *    value: { x: -3, c: 0 }
     * }
     */
    createXPart(coefficient)
    {
        return {
            text: this.formatXTerm(coefficient),
            value: {
                x: coefficient,
                c: 0
            }
        };
    }

    /**
     * Laver et konstantled som byggeklods.
     *
     * Returnerer fx:
     * {
     *    text: "7",
     *    value: { x: 0, c: 7 }
     * }
     */
    createConstantPart(constant)
    {
        return {
            text: String(constant),
            value: {
                x: 0,
                c: constant
            }
        };
    }

    /**
     * Laver en parentes af typen:
     * multiplier(x + innerConstant)
     *
     * Eksempel:
     * 3(x - 4)
     *
     * Matematikken bag:
     * 3(x - 4) = 3x - 12
     */
    createParenthesisPart(multiplier, innerConstant)
    {
        const insideText = this.joinTerms(["x", String(innerConstant)]);

        return {
            text: `${multiplier}(${insideText})`,
            value: {
                x: multiplier,
                c: multiplier * innerConstant
            }
        };
    }

    /**
     * Omdanner en liste af parts til et tekstudtryk og dets reducerede form.
     *
     * Returnerer fx:
     * {
     *    text: "3x - 2 + x + 5",
     *    reduced: { x: 4, c: 3 }
     * }
     */
    composeExpression(parts)
    {
        const shuffledParts = this.shuffle(parts);

        return {
            text: this.joinTerms(shuffledParts.map(part => part.text)),
            reduced: this.sumParts(shuffledParts)
        };
    }

    /* =========================================================
       MATEMATISK KERNE
    ========================================================= */

    /**
     * Vælger først en heltalsløsning x = solution
     * og bygger derefter to reducerede udtryk:
     *
     * leftReduced  = ax + b
     * rightReduced = cx + d
     *
     * sådan at:
     * - leftReduced og rightReduced har samme værdi for x = solution
     * - a !== c
     *
     * Så er ligningen garanteret løselig til et helt tal.
     */
    createSolvedEquationData(level)
    {
        const solution = this.randInt(-10, 10);

        let leftX;
        let rightX;

        do
        {
            if (level === 2)
            {
                leftX = this.randInt(2, 6);
                rightX = this.randInt(-6, 6);
            }
            else
            {
                leftX = this.randInt(-6, 6);
                rightX = this.randInt(-6, 6);
            }
        }
        while (leftX === 0 || rightX === 0 || leftX === rightX);

        const leftC = this.randInt(-15, 15);

        const leftReduced = {
            x: leftX,
            c: leftC
        };

        const targetValue = this.evaluateExpression(leftReduced, solution);

        const rightC = targetValue - rightX * solution;

        const rightReduced = {
            x: rightX,
            c: rightC
        };

        return {
            solution,
            leftReduced,
            rightReduced
        };
    }

    /* =========================================================
       OPBYGNING AF "PÆNE" ELEVOPGAVER
    ========================================================= */

    /**
     * Bygger et niveau 1-udtryk, som reducerer til det ønskede reduced-udtryk.
     *
     * Denne funktion bruges til simple reduktionsopgaver uden parenteser.
     */
    buildLevel1Expression(reduced)
    {
        const parts = [];

        /*
         * Vi splitter x-leddet op i mindst to dele,
         * så eleven faktisk skal samle ens led.
         */
        const firstX = this.randNonZero(-5, 5);
        const secondX = reduced.x - firstX;

        if (secondX === 0)
        {
            return this.buildLevel1Expression(reduced);
        }

        parts.push(this.createXPart(firstX));
        parts.push(this.createXPart(secondX));

        /*
         * Nogle gange tilføjer vi et ekstra par x-led,
         * som ophæver hinanden, for at gøre opgaven mere varieret.
         */
        if (Math.random() < 0.5)
        {
            const extraX = this.randNonZero(-3, 3);
            parts.push(this.createXPart(extraX));
            parts.push(this.createXPart(-extraX));
        }

        /*
         * Konstantleddet opdeles også i flere dele,
         * så der er noget at reducere.
         */
        if (reduced.c !== 0)
        {
            const firstC = this.randInt(-8, 8);
            const secondC = reduced.c - firstC;

            if (firstC !== 0) parts.push(this.createConstantPart(firstC));
            if (secondC !== 0) parts.push(this.createConstantPart(secondC));
        }
        else
        {
            /*
             * Hvis konstantleddet er 0, laver vi i stedet
             * et plus/minus-par, som går ud med hinanden.
             */
            const extraC = this.randNonZero(-6, 6);
            parts.push(this.createConstantPart(extraC));
            parts.push(this.createConstantPart(-extraC));
        }

        return this.composeExpression(parts);
    }

    /**
     * Bygger en side til niveau 2.
     *
     * Målet er at få mindst én parentes på siden,
     * men stadig holde opgaven rimelig overskuelig.
     */
    buildLevel2Side(reduced)
    {
        const multiplier = this.randInt(2, 4);
        const innerConstant = this.randNonZero(-6, 6);

        const parenthesisPart = this.createParenthesisPart(multiplier, innerConstant);

        /*
         * Når parentesen er valgt, skal resten af siden
         * kompensere, så den samlede reducerede form stadig bliver korrekt.
         */
        const remaining = {
            x: reduced.x - parenthesisPart.value.x,
            c: reduced.c - parenthesisPart.value.c
        };

        const parts = [parenthesisPart];

        /*
         * Del resterende x-led op i 1 eller 2 ekstra led.
         */
        if (remaining.x !== 0)
        {
            const splitX = this.randNonZero(-6, 6);

            if (splitX !== remaining.x && remaining.x - splitX !== 0)
            {
                parts.push(this.createXPart(splitX));
                parts.push(this.createXPart(remaining.x - splitX));
            }
            else
            {
                parts.push(this.createXPart(remaining.x));
            }
        }

        /*
         * Del resterende konstantled op i 1 eller 2 led.
         */
        if (remaining.c !== 0)
        {
            const splitC = this.randInt(-8, 8);

            if (splitC !== remaining.c && remaining.c - splitC !== 0)
            {
                parts.push(this.createConstantPart(splitC));
                parts.push(this.createConstantPart(remaining.c - splitC));
            }
            else
            {
                parts.push(this.createConstantPart(remaining.c));
            }
        }

        return this.composeExpression(parts);
    }

    /**
     * Bygger en side til niveau 3.
     *
     * Her bruges typisk to parenteser,
     * og fortegnene må gerne være mere blandede.
     */
    buildLevel3Side(reduced)
    {
        const multiplier1 = this.randNonZero(-4, 4);
        const innerConstant1 = this.randNonZero(-6, 6);
        const part1 = this.createParenthesisPart(multiplier1, innerConstant1);

        const afterPart1 = {
            x: reduced.x - part1.value.x,
            c: reduced.c - part1.value.c
        };

        const multiplier2 = this.randNonZero(-4, 4);
        const innerConstant2 = this.randNonZero(-6, 6);
        const part2 = this.createParenthesisPart(multiplier2, innerConstant2);

        const remaining = {
            x: afterPart1.x - part2.value.x,
            c: afterPart1.c - part2.value.c
        };

        const parts = [part1, part2];

        /*
         * Det der mangler efter de to parenteser,
         * tilføjes som almindelige led.
         */
        if (remaining.x !== 0)
        {
            parts.push(this.createXPart(remaining.x));
        }

        if (remaining.c !== 0)
        {
            parts.push(this.createConstantPart(remaining.c));
        }

        return this.composeExpression(parts);
    }

    /* =========================================================
       TJEK / VALIDERING
    ========================================================= */

    /**
     * Returnerer true hvis ligningen faktisk giver den forventede løsning.
     *
     * Kan bruges i andre værktøjer som sikkerhedstjek.
     */
    isEquationSolvedBy(leftReduced, rightReduced, solution)
    {
        return this.evaluateExpression(leftReduced, solution) === this.evaluateExpression(rightReduced, solution);
    }

    /**
     * Returnerer true hvis der er præcis én løsning.
     *
     * For ax + b = cx + d kræver det a !== c.
     */
    hasSingleSolution(leftReduced, rightReduced)
    {
        return leftReduced.x !== rightReduced.x;
    }

    /* =========================================================
       OPGAVEGENERERING PR. NIVEAU
    ========================================================= */

    /**
     * Laver en niveau 1-opgave:
     * kun ét udtryk, som skal reduceres.
     */
    createLevel1Task()
    {
        const reduced = {
            x: this.randNonZero(-8, 8),
            c: this.randInt(-12, 12)
        };

        const expression = this.buildLevel1Expression(reduced);

        return {
            level: 1,
            type: "reduction",
            question: expression.text,
            reduced: this.formatReducedExpression(expression.reduced),
            answer: this.formatReducedExpression(expression.reduced),
            terms: {
                x: expression.reduced.x,
                c: expression.reduced.c
            }
        };
    }

    /**
     * Laver en niveau 2-opgave:
     * ligning med heltalsløsning og parenteser.
     */
    createLevel2Task()
    {
        const equationData = this.createSolvedEquationData(2);

        const left = this.buildLevel2Side(equationData.leftReduced);
        const right = this.buildLevel1Expression(equationData.rightReduced);

        return {
            level: 2,
            type: "equation",
            question: `${left.text} = ${right.text}`,
            reduced: `${this.formatReducedExpression(left.reduced)} = ${this.formatReducedExpression(right.reduced)}`,
            answer: `x = ${equationData.solution}`,
            solution: equationData.solution,
            left: {
                x: left.reduced.x,
                c: left.reduced.c
            },
            right: {
                x: right.reduced.x,
                c: right.reduced.c
            },
            meta: {
                hasSingleSolution: this.hasSingleSolution(left.reduced, right.reduced),
                isConsistentWithSolution: this.isEquationSolvedBy(left.reduced, right.reduced, equationData.solution)
            }
        };
    }

    /**
     * Laver en niveau 3-opgave:
     * ligning med heltalsløsning og flere parenteser.
     */
    createLevel3Task()
    {
        const equationData = this.createSolvedEquationData(3);

        const left = this.buildLevel3Side(equationData.leftReduced);
        const right = this.buildLevel2Side(equationData.rightReduced);

        return {
            level: 3,
            type: "equation",
            question: `${left.text} = ${right.text}`,
            reduced: `${this.formatReducedExpression(left.reduced)} = ${this.formatReducedExpression(right.reduced)}`,
            answer: `x = ${equationData.solution}`,
            solution: equationData.solution,
            left: {
                x: left.reduced.x,
                c: left.reduced.c
            },
            right: {
                x: right.reduced.x,
                c: right.reduced.c
            },
            meta: {
                hasSingleSolution: this.hasSingleSolution(left.reduced, right.reduced),
                isConsistentWithSolution: this.isEquationSolvedBy(left.reduced, right.reduced, equationData.solution)
            }
        };
    }
}