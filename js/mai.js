// MADE BY BERIKAI 2023
// https://github.com/berikai

// Main class of Mai
class Mai {
    constructor(name) {
        this.name = name;
        this.concept_web = new ConceptWeb(); 
    }

    getName() {
        return this.name;
    }

    getConceptWeb() {
        return this.concept_web;
    }

    // The function which Mai takes input
    listen(input) {
        // Split input by whitespaces into words
        const words = input.toLocaleLowerCase().split(' ');

        // For each word, do:
        words.forEach((word) => {
            // Create a new concept
            const concept = new Concept(word);

            // Add concept to concept web
            this.getConceptWeb().addConcept(concept);

            // For each concept, do:
            this.getConceptWeb().getWeb().forEach((concept) => {

                // Check if the concept is one of the concepts that is in this input (is they releated to each other?)
                if(word == concept.getWord())
                    // Create a new array by turning words into RelationConcept object and add relations to the concept
                    concept.addRelations(words.map((word) => new RelationConcept(word)));

            });
        });
    }

    // The function which Mai takes input and returns an answer
    answer(input) {
        // Create an object that handles answering
        this.sentence = "";
        this.word_pool = [];

        this.generateRandomSeed = (base) => {
            return Math.floor(Math.random() * (base));
        }

        this.addConcept = (concept) => {
            for(let i = 0; i < Math.pow(2, concept.getFrequency()); i++) {
                this.word_pool.push(concept.getWord());
            }

            concept.getRelations().map((relation) => {
                for(let i = 0; i < Math.pow(5, relation.getRelationFrequency()); i++) {
                    this.word_pool.push(relation.getWord());
                }
            });
        }

        this.addWordsToSentence = (word) => {
            this.sentence += " " + word;
        }

        this.returnOutput = () => {

            for(let i = 0; i < Math.floor(this.generateRandomSeed((this.word_pool.length - 1) < 10 ? this.word_pool.length - 1 : 10) + 1); i++) {
                const seed = this.generateRandomSeed(this.word_pool.length - 1);
                this.addWordsToSentence(this.word_pool[seed] ?? '');
                this.word_pool = this.word_pool.filter((word) => word != this.word_pool[seed]);
            }
            
            return this.sentence.trim();
        }

        // Split input by whitespaces into words
        const words = input.toLocaleLowerCase().split(' ');

        // For each word, do:
        words.forEach((word) => {
            // Create a new concept
            const concept = new Concept(word);

            // Add concept to concept web
            this.getConceptWeb().addConcept(concept);

            // For each concept, do:
            this.getConceptWeb().getWeb().forEach((concept) => {

                // Check if the concept is one of the concepts that is in this input (is they releated to each other?)
                if(word == concept.getWord()) {
                    // Create a new array by turning words into RelationConcept object and add relations to the concept
                    concept.addRelations(words.map((word) => new RelationConcept(word)));

                    // Add main concepts to answer's concept web
                    this.addConcept(concept);
                }
            });

        });

        return this.returnOutput();
    }

    speak() {

    }
    
}

// A web for concepts
class ConceptWeb {
    constructor() {
        this.web = [];
    }

    getWeb() {
        return this.web;
    }

    // Add concepts to web
    addConcept(concept) {
        // If there is already a concept that represents same word
        if (this.web.filter((web_concept) => web_concept.getWord() == concept.getWord()).length == 1)
            // Increase the frequency of that concept
            this.web.forEach((web_concept) => web_concept.getWord() == concept.getWord() ? web_concept.increaceFrequency() : null)
        else
            // Add new concept
            this.web.push(concept);
    }
    
}

// The concept object
class Concept {
    constructor(word) {
        this.word = word;
        this.frequency = 1;
        this.relations = [];
    }

    getWord() {
        return this.word;
    }

    getFrequency() {
        return this.frequency;
    } 

    increaceFrequency() {
        this.frequency++;
    }

    getRelations() {
        return this.relations;
    }

    // Add relations to concept
    addRelations(relations) {
        // For each relation that is in the relations array, do:
        relations.forEach((relation) => {
            // If RelationConcept is not this Concept
            if(relation.getWord() != this.getWord()) {
                // If there is already a relation concept that represents the same concept
                if (this.relations.filter((concept_relation) => concept_relation.getWord() == relation.getWord()).length == 1)
                    // Increase the relation frequency of that relation
                    this.relations.forEach((concept_relation) => concept_relation.getWord() == relation.getWord() ? concept_relation.increaceRelationFrequency() : null)
                else
                    // Add new relation
                    this.relations.push(relation);
            }
        });
    }
}

// RelationConcepts represent the Concepts that is in relation with a Concept
class RelationConcept {
    constructor(word) {
        this.word = word;
        this.relationFrequency = 1;
    }

    getWord() {
        return this.word;
    }

    getRelationFrequency() {
        return this.relationFrequency;
    }

    increaceRelationFrequency() {
        this.relationFrequency++;
    }
}
