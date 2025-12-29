import { pub } from "@/orpc"

export default {
    world: pub.handler(() => {
        return "👋 🌍"
    })
}