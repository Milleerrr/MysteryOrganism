// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (spcimenNum, dna) => {
  return {
    spcimenNum,
    dna,
    mutate() {
      const randIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (this.dna[randIndex] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[randIndex] = newBase;
      return this.dna;
    },
    compareDNA(otherOrg) {
      const similarities = this.dna.reduce((acc, curr, idx, arr) => {
        if (arr[idx] === otherOrg.dna[idx]) {
          return acc + 1;
        } else {
          return acc;
        }
      }, 0);
      const percentOfDNAshared = (similarities / this.dna.length) * 100;
      const percentageTo2Deci = percentOfDNAshared.toFixed(2);
      console.log(
        `${this.specimanNum} and ${otherOrg.specimanNum} have ${percentageTo2Deci}% DNA in common.`
      );
    },
    willLikelySurvive() {
      let counter = 0;
      this.dna.forEach((e) => {
        switch (e) {
          case "C":
          case "G":
            counter++;
            break;
          default:
            break;
        }
      });
      const percent = (counter / this.dna.length) * 100;
      const percent2Deci = percent.toFixed(0);
      if (percent2Deci >= 60) {
        return true;
      } else {
        return false;
      }
    },
  };
};

const viableSpecimen = [];
let idCounter = 1;

while (viableSpecimen.length < 30) {
  let newOrg = pAequorFactory(idCounter, mockUpStrand());
  if (newOrg.willLikelySurvive()) {
    viableSpecimen.push(newOrg);
  }
  idCounter++;
}

let o = pAequorFactory(2, mockUpStrand());
console.log(viableSpecimen);
