import axios from "axios";
import client from "../../config/chroma.js";
import { loadKnowledge } from "./loadKnowledge.js";
import { chunkText } from "./chunkText.js";
import { OLLAMA_URL, EMBEDDING_MODEL } from "../../config/ollama.js";
import path from "path";

export const indexKnowledgeBase = async () => {
    try {
        console.log("Loading knowledge base...");
        console.log("OLLAMA:", OLLAMA_URL);

        const docs = loadKnowledge("./knowledge-base");
        const collection = await client.getOrCreateCollection({
            name: "pixorate-knowledge"
        });
        let id = 1;
        for (const doc of docs) {
            const chunks = chunkText(doc.content);
            for (const chunk of chunks) {
                const embeddingResponse = await axios.post(
                    `${OLLAMA_URL}/api/embeddings`,
                    {
                        model: EMBEDDING_MODEL,
                        prompt: chunk
                    }
                );
                await collection.add({
                    ids: [id.toString()],
                    embeddings: [
                        embeddingResponse.data.embedding
                    ],
                    documents: [chunk],
                    metadatas: [{
                        category: doc.category === "platforms" ? "platform" : doc.category === "tones" ? "tone" : "seo",
                        name: path.parse(doc.filename).name
                    }]
                });
                console.log(`✅ Indexed ${doc.filename}`);
                id++;
            }

        }
        console.log("🎉 Knowledge Base Indexed Successfully");
    } catch (error) {
        console.log(error.response?.data || error.message);
    }
};