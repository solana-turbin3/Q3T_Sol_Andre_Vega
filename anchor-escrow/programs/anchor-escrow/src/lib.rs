use anchor_lang::prelude::*;


declare_id!("GT2xcgeotPZzzgb924oUh1zvEU4WBkrfkk2WP86UBdE7");

pub mod state;
pub use state::*;

pub mod instructions;
pub use instructions::*;

#[program]
pub mod anchor_escrow {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
